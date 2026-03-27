import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AutomationService } from './automation.service';
import { CreateAutomationRuleDto } from './dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('automation/rules')
export class AutomationController {
  constructor(private automationService: AutomationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createRule(@Body() dto: CreateAutomationRuleDto) {
    return this.automationService.createRule(dto);
  }

  @Get()
  getRules() {
    return this.automationService.getRules();
  }

  @Get(':id')
  getRule(@Param('id') id: string) {
    return this.automationService.getRule(id);
  }

  @Patch(':id')
  updateRule(@Param('id') id: string, @Body() dto: any) {
    return this.automationService.updateRule(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteRule(@Param('id') id: string) {
    return this.automationService.deleteRule(id);
  }

  @Post(':id/run')
  @HttpCode(HttpStatus.CREATED)
  runRule(@Param('id') id: string) {
    return this.automationService.runRule(id);
  }
}
