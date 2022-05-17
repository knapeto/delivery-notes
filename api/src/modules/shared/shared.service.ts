import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getTokenSalt, isPasswordValid } from '../../utils/password';

import { AuthType } from '../core/role.guard';
import { CreateUserInputDto } from '../user/typegraphql/user.dto';
import { JwtService } from '@nestjs/jwt';
import LdapClient from 'ldapjs';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { User } from '../user/entities/user.entity';
import { pathOr } from 'ramda';

@Injectable()
export class SharedService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  static getUserDataForToken(user: User, role: AuthType) {
    return {
      id: user.id,
      tokenSalt: user.tokenSalt,
      role,
    };
  }

  async login(email: string, password: string, role: AuthType, res: Response) {
    const userDB = await this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
        isAd: false,
      },
    });

    let userLdap = null;
    let user = userDB;
    if (!user) {
      userLdap = await this.getLdapUser(email, password);

      if (userLdap) {
        await this.searchOrCreate({
          isAd: true,
          email: userLdap.mail.toLowerCase(),
          tokenSalt: getTokenSalt(),
          lastName: userLdap.sn,
          firstName: userLdap.givenName,
          isAdmin: false,
          password: null,
        });

        user = await this.prismaService.user.findFirst({
          where: { email },
        });
      }

      if (!user) {
        throw new UnauthorizedException('LOGIN_ERROR');
      }
    } else if (!isPasswordValid(password, user.password)) {
      throw new UnauthorizedException('LOGIN_ERROR');
    }

    const access_token = this.jwtService.sign(
      SharedService.getUserDataForToken(user, role),
    );

    res &&
      res.cookie('access_token', `${access_token}`, {
        httpOnly: false,
        secure: false,
      });

    return {
      user,
      access_token,
    };
  }

  async searchOrCreate(userDto: CreateUserInputDto): Promise<User> {
    const {
      password,
      firstName,
      lastName,
      isAd = false,
      isAdmin = false,
      email,
    } = userDto;

    const userInDb = await this.prismaService.user.findFirst({
      where: { email, deletedAt: null },
    });
    if (!userInDb) {
      return await this.prismaService.user.create({
        data: {
          password,
          email,
          firstName,
          lastName,
          isAd,
          isAdmin,
        },
      });
    }
    return userInDb;
  }

  async getLdapUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const ldap = LdapClient.createClient({
        url: 'ldap://dc-core.esa.eu',
      });

      ldap.bind('ESAEU\\spiceworks', '7Kt5518x212Z26r', (err) => {
        if (err) {
          console.log(`LDAP connection failed: ${err}`);
          ldap.destroy();
          return reject(err);
        } else {
          const opts = {
            scope: 'sub' as const,
            filter: `(mail=${email})`,
          };

          ldap.search('dc=ESA,dc=EU', opts, (error, res) => {
            if (error) {
              console.log(error);
              ldap.destroy();
            }

            let user = null;

            res.on('searchEntry', function (entry) {
              user = entry.object;

              if (!password) {
                ldap.destroy();
                resolve(entry.object);
              } else {
                ldap.bind(
                  pathOr('', ['object', 'dn'], entry),
                  password,
                  function (err) {
                    if (err) {
                      console.log(err);
                      ldap.destroy();

                      return resolve(null);
                    }

                    resolve(entry.object);
                  },
                );
              }
            });
            if (!password) {
              res.on('error', function (err) {
                ldap.destroy();
                console.error('error: ' + err.message);
              });
              res.on('end', function (result) {
                if (!user) {
                  ldap.destroy();
                  resolve(null);
                }
              });
            }
          });
        }
      });
    });
  }
}
