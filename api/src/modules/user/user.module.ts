import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedService } from '../shared/shared.service';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, SharedService],
  exports: [UserService],
})
export class UserModule {}
