"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const today = new Date();
        const start = (0, date_fns_1.startOfDay)(today);
        const end = (0, date_fns_1.endOfDay)(today);
        const next7Days = (0, date_fns_1.addDays)(today, 7);
        const [totalCustomers, interactionsToday, warrantiesExpiring, znsSentToday, znsFailedToday, recentFollowups,] = await Promise.all([
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
        const header = 'Mã KH,Họ tên,Số điện thoại,Email,Loại KH,Phân khúc,Nguồn,Ngày tạo\n';
        const rows = customers.map((c) => {
            return `${c.code},"${c.full_name}",${c.phone_primary || ''},${c.email_primary || ''},${c.customer_type},${c.segment},"${c.source || ''}",${c.created_at.toISOString()}\n`;
        });
        return header + rows.join('');
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map