import { Global, Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.SECRET_KEY,
      }),
      inject: [],
    }),
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
