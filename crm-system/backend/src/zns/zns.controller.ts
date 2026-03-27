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
import { ZnsService } from './zns.service';
import { CreateZnsTemplateDto, SendZnsMessageDto } from './dtos';
import { ZnsStatus } from '@prisma/client';

@Controller('zns')
export class ZnsController {
  constructor(private znsService: ZnsService) {}

  @Post('templates')
  @HttpCode(HttpStatus.CREATED)
  createTemplate(@Body() dto: CreateZnsTemplateDto) {
    return this.znsService.createTemplate(dto);
  }

  @Get('templates')
  getTemplates() {
    return this.znsService.getTemplates();
  }

  @Post('send')
  @HttpCode(HttpStatus.CREATED)
  send(@Body() dto: SendZnsMessageDto) {
    return this.znsService.sendZnsMessage(dto);
  }

  @Get('logs/customer/:customerId')
  getLogs(@Param('customerId') customerId: string) {
    return this.znsService.getZnsLogs(customerId);
  }

  @Get('queued')
  getQueuedMessages() {
    return this.znsService.getQueuedMessages();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; zalo_msg_id?: string },
  ) {
    return this.znsService.updateZnsStatus(id, body.status as ZnsStatus, body.zalo_msg_id);
  }
}
