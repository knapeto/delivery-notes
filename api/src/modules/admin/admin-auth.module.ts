import { ConfigModule, ConfigService } from '@nestjs/config';

import { AdminAuthResolver } from './admin-auth.resolver';
import { AdminAuthService } from './admin-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedService } from '../shared/shared.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AdminAuthService, AdminAuthResolver, SharedService],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
