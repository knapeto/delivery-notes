import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../@generated/user/user.model';
import { path } from 'ramda';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => path(['query', 'access_token'], req),
        (req) => path(['cookies', 'access_token'], req),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: User): Promise<User> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
