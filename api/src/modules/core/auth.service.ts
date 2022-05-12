import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(input: User): Promise<User> {
    const { id } = input;
    const user = await this.prismaService.user.findFirst({
      where: {
        deletedAt: null,
        id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }
    return user;
  }
}
