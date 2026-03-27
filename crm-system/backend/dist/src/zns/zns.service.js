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
exports.ZnsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ZnsService = class ZnsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTemplate(dto) {
        const existing = await this.prisma.znsTemplate.findUnique({
            where: { zalo_template_id: dto.zalo_template_id },
        });
        if (existing) {
            throw new common_1.BadRequestException('Template with this Zalo ID already exists');
        }
        return this.prisma.znsTemplate.create({
            data: {
                name: dto.name,
                zalo_template_id: dto.zalo_template_id,
                content: dto.content,
                variables: JSON.stringify(dto.variables),
                status: dto.status || 'ACTIVE',
            },
        });
    }
    async getTemplates() {
        return this.prisma.znsTemplate.findMany({
            where: { status: 'ACTIVE' },
            orderBy: { created_at: 'desc' },
        });
    }
    async sendZnsMessage(dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: dto.customer_id },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        const template = await this.prisma.znsTemplate.findUnique({
            where: { id: dto.template_id },
        });
        if (!template) {
            throw new common_1.BadRequestException('Template not found');
        }
        return this.prisma.znsMessageLog.create({
            data: {
                customer_id: dto.customer_id,
                template_id: dto.template_id,
                phone_number: dto.phone_number,
                payload: JSON.stringify(dto.payload),
                status: 'QUEUED',
            },
        });
    }
    async getZnsLogs(customerId) {
        return this.prisma.znsMessageLog.findMany({
            where: { customer_id: customerId },
            include: {
                template: true,
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async updateZnsStatus(messageId, status, zaloMsgId) {
        const updateData = { status };
        if (status === client_1.ZnsStatus.SENT) {
            updateData.sent_at = new Date();
        }
        if (status === client_1.ZnsStatus.DELIVERED) {
            updateData.delivered_at = new Date();
        }
        if (zaloMsgId) {
            updateData.zalo_msg_id = zaloMsgId;
        }
        return this.prisma.znsMessageLog.update({
            where: { id: messageId },
            data: updateData,
        });
    }
    async getQueuedMessages() {
        return this.prisma.znsMessageLog.findMany({
            where: { status: 'QUEUED' },
            include: {
                customer: true,
                template: true,
            },
            orderBy: { created_at: 'asc' },
            take: 100,
        });
    }
};
exports.ZnsService = ZnsService;
exports.ZnsService = ZnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ZnsService);
//# sourceMappingURL=zns.service.js.map