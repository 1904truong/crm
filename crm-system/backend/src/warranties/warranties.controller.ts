import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WarrantiesService } from './warranties.service';
import { CreateWarrantyCaseDto, UpdateWarrantyCaseDto } from './dtos';

@Controller('warranties')
export class WarrantiesController {
  constructor(private warrantiesService: WarrantiesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCase(@Body() dto: CreateWarrantyCaseDto) {
    return this.warrantiesService.createWarrantyCase(dto);
  }

  @Get('customer/:customerId')
  getCasesByCustomer(@Param('customerId') customerId: string) {
    return this.warrantiesService.getWarrantyCases(customerId);
  }

  @Get('expiring')
  getExpiringWarranties(@Query('days') days: number = 30) {
    return this.warrantiesService.getExpiringWarranties(days);
  }

  @Get(':id')
  getCaseById(@Param('id') id: string) {
    return this.warrantiesService.getWarrantyCaseById(id);
  }

  @Patch(':id')
  updateCase(@Param('id') id: string, @Body() dto: UpdateWarrantyCaseDto) {
    return this.warrantiesService.updateWarrantyCase(id, dto);
  }
}
