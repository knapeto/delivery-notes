import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/core/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DeliveryNotesModule } from './modules/deliveryNotes/delivery-notes.module';
import { HealthController } from './modules/health/health.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

export interface GqlContext {
  req: Request;
  res: Response;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminModule,
    AuthModule,
    PrismaModule,
    UserModule,
    DeliveryNotesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
