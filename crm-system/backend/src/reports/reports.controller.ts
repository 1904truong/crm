import { Controller, Get, UseGuards, Res, Req, Logger } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response, Request } from 'express';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  private readonly logger = new Logger(ReportsController.name);

  constructor(private reportsService: ReportsService) {}

  @Get('stats')
  getStats(@Req() req: Request) {
    this.logger.log(
      `Fetching stats. Auth header: ${req.headers.authorization ? 'Present' : 'Missing'}`,
    );
    return this.reportsService.getDashboardStats();
  }

  @Get('export/customers')
  async exportCustomers(@Res() res: Response, @Req() req: Request) {
    this.logger.log(
      `Exporting customers. Auth header: ${req.headers.authorization ? 'Present' : 'Missing'}`,
    );
    const csv = await this.reportsService.exportCustomersCsv();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=customers_report.csv',
    );
    return res.send('\ufeff' + csv);
  }
}
