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
exports.InteractionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InteractionsService = class InteractionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createInteraction(dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: dto.customer_id },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return this.prisma.interaction.create({
            data: {
                customer_id: dto.customer_id,
                type: dto.type,
                content: dto.content,
                owner_id: dto.owner_id,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async getInteractionHistory(customerId) {
        return this.prisma.interaction.findMany({
            where: { customer_id: customerId },
            include: {
                owner: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async createReminder(dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: dto.customer_id },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return this.prisma.reminder.create({
            data: {
                customer_id: dto.customer_id,
                interaction_id: dto.interaction_id,
                title: dto.title,
                description: dto.description,
                follow_up_at: new Date(dto.follow_up_at),
                status: 'PENDING',
                owner_id: dto.owner_id,
            },
        });
    }
    async getReminders(customerId) {
        return this.prisma.reminder.findMany({
            where: {
                customer_id: customerId,
                status: { in: ['PENDING'] },
            },
            orderBy: { follow_up_at: 'asc' },
        });
    }
    async getPendingReminders() {
        const now = new Date();
        return this.prisma.reminder.findMany({
            where: {
                status: 'PENDING',
                follow_up_at: { lte: now },
            },
            include: {
                customer: true,
            },
            orderBy: { follow_up_at: 'asc' },
        });
    }
    async updateReminder(id, dto) {
        return this.prisma.reminder.update({
            where: { id },
            data: dto,
        });
    }
};
exports.InteractionsService = InteractionsService;
exports.InteractionsService = InteractionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InteractionsService);
//# sourceMappingURL=interactions.service.js.map