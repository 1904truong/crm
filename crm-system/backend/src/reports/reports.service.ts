import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { startOfDay, endOfDay, addDays } from 'date-fns';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);
    const next7Days = addDays(today, 7);

    const [
      totalCustomers,
      interactionsToday,
      warrantiesExpiring,
      znsSentToday,
      znsFailedToday,
      recentFollowups,
    ] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.interaction.count({
        where: { created_at: { gte: start, lte: end } },
      }),
      this.prisma.customerProduct.count({
        where: {
          warranty_end_at: { gte: today, lte: next7Days },
        },
      }),
      this.prisma.znsMessageLog.count({
        where: {
          created_at: { gte: start, lte: end },
          status: 'SENT',
        },
      }),
      this.prisma.znsMessageLog.count({
        where: {
          created_at: { gte: start, lte: end },
          status: 'FAILED',
        },
      }),
      this.prisma.reminder.findMany({
        where: {
          status: 'PENDING',
          follow_up_at: { lte: end },
        },
        include: {
          customer: true,
        },
        orderBy: {
          follow_up_at: 'asc',
        },
        take: 5,
      }),
    ]);

    return {
      totalCustomers,
      interactionsToday,
      warrantiesExpiring,
      znsStats: {
        sent: znsSentToday,
        failed: znsFailedToday,
        total: znsSentToday + znsFailedToday,
      },
      recentFollowups,
    };
  }

  async exportCustomersCsv() {
    const customers = await this.prisma.customer.findMany({
      include: {
        products: true,
      },
    });

    const header =
      'Mã KH,Họ tên,Số điện thoại,Email,Loại KH,Phân khúc,Nguồn,Ngày tạo\n';
    const rows = customers.map((c) => {
      return `${c.code},"${c.full_name}",${c.phone_primary || ''},${c.email_primary || ''},${c.customer_type},${c.segment},"${c.source || ''}",${c.created_at.toISOString()}\n`;
    });

    return header + rows.join('');
  }
}
