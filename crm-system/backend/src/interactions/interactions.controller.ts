import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import {
  CreateInteractionDto,
  CreateReminderDto,
  UpdateReminderDto,
} from './dtos';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('interactions')
export class InteractionsController {
  constructor(private interactionsService: InteractionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createInteraction(@Body() dto: CreateInteractionDto) {
    return this.interactionsService.createInteraction(dto);
  }

  @Get('customer/:customerId')
  getHistory(@Param('customerId') customerId: string) {
    return this.interactionsService.getInteractionHistory(customerId);
  }

  @Post('reminders')
  @HttpCode(HttpStatus.CREATED)
  createReminder(@Body() dto: CreateReminderDto) {
    return this.interactionsService.createReminder(dto);
  }

  @Get('reminders/customer/:customerId')
  getReminders(@Param('customerId') customerId: string) {
    return this.interactionsService.getReminders(customerId);
  }

  @Get('reminders/pending')
  getPendingReminders() {
    return this.interactionsService.getPendingReminders();
  }

  @Patch('reminders/:id')
  updateReminder(@Param('id') id: string, @Body() dto: UpdateReminderDto) {
    return this.interactionsService.updateReminder(id, dto);
  }
}
