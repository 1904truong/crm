import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AutomationService } from './automation.service';
import { AutomationController } from './automation.controller';
import { WarrantyAutomationService } from './services/warranty-automation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ZnsModule } from '../zns/zns.module';
import { InteractionsModule } from '../interactions/interactions.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    ZnsModule,
    InteractionsModule,
  ],
  controllers: [AutomationController],
  providers: [AutomationService, WarrantyAutomationService],
  exports: [AutomationService],
})
export class AutomationModule {}
