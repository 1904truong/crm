import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZnsService } from './zns.service';
import { ZaloService } from './services/zalo.service';
import { ZnsController } from './zns.controller';
import { ZaloWebhookController } from './controllers/zalo-webhook.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [ZnsController, ZaloWebhookController],
  providers: [ZnsService, ZaloService],
  exports: [ZnsService, ZaloService],
})
export class ZnsModule {}
