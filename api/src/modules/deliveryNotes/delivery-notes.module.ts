import { DeliveryNotesController } from './delivery-notes.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [DeliveryNotesController],
})
export class DeliveryNotesModule {}
