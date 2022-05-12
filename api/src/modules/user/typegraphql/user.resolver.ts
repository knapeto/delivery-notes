import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { getTokenSalt, hashPassword } from '../../../utils/password';
import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateUserArgs,
  UpdateUserArgs,
  User,
} from '../../../@generated/type-graphql';
import { UpdateUserInputDto } from './user.dto';

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => Boolean)
  async testMutation(): Promise<boolean> {
    return true;
  }

  @Query(() => Boolean)
  async testQuery(): Promise<boolean> {
    return true;
  }

  @Mutation(() => User)
  async createUser(
    @Ctx()
    { prisma }: { prisma: PrismaService },
    @Args() args: CreateUserArgs,
  ): Promise<User | null> {
    const checkUser = await prisma.user.findFirst({
      where: {
        email: args.data.email,
      },
    });

    if (!!checkUser) {
      throw new BadRequestException({
        generalErrorCode: 'USER_ALREADY_EXISTS',
      });
    }

    args.data.password = hashPassword(args.data.password);
    args.data.tokenSalt = getTokenSalt();

    if (args.data.isAdmin) {
      args.data.presetPassword = true;
    }

    return prisma.user.create({
      data: args.data,
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Ctx()
    { prisma }: { prisma: PrismaService },
    @Args({ validate: false }) args: UpdateUserArgs,
  ): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: args.where.id,
        deletedAt: null,
      },
      // select only require data for validation in DTO
      select: {
        email: true,
      },
    });

    if (!user) {
      throw new BadRequestException({
        generalErrorCode: 'USER_DOES_NOT_EXISTS',
      });
    }

    const updateFields: UpdateUserInputDto = {};
    Object.keys(args.data).forEach((key) => {
      updateFields[key] = args.data[key].set;
    });
    if (updateFields.password) {
      updateFields.password = hashPassword(updateFields.password);
    }

    if (args.data.email) {
      const checkUser = await prisma.user.findFirst({
        where: {
          email: args.data.email.set,
          id: {
            not: args.where.id,
          },
        },
      });

      if (!!checkUser) {
        throw new BadRequestException({
          generalErrorCode: 'USER_ALREADY_EXISTS',
        });
      }
    }

    return prisma.user.update({
      data: updateFields,
      where: {
        id: args.where.id,
      },
    });
  }
}
