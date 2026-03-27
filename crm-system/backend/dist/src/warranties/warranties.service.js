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
exports.WarrantiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WarrantiesService = class WarrantiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWarrantyCase(dto) {
        const product = await this.prisma.customerProduct.findUnique({
            where: { id: dto.customer_product_id },
        });
        if (!product) {
            throw new common_1.BadRequestException('Product not found');
        }
        const now = new Date();
        if (product.warranty_end_at < now) {
            throw new common_1.BadRequestException('Product warranty has expired');
        }
        return this.prisma.warrantyCase.create({
            data: {
                customer_product_id: dto.customer_product_id,
                issue_description: dto.issue_description,
                status: 'OPEN',
            },
        });
    }
    async getWarrantyCases(customerId) {
        return this.prisma.warrantyCase.findMany({
            where: {
                customer_product: {
                    customer_id: customerId,
                },
            },
            include: {
                customer_product: {
                    include: {
                        customer: true,
                    },
                },
            },
            orderBy: { opened_at: 'desc' },
        });
    }
    async getWarrantyCaseById(id) {
        return this.prisma.warrantyCase.findUnique({
            where: { id },
            include: {
                customer_product: {
                    include: {
                        customer: true,
                    },
                },
            },
        });
    }
    async updateWarrantyCase(id, dto) {
        const updateData = { ...dto };
        const status = dto.status;
        if (status !== undefined && status === 'CLOSED') {
            updateData.closed_at = new Date();
        }
        return this.prisma.warrantyCase.update({
            where: { id },
            data: updateData,
        });
    }
    async getExpiringWarranties(daysAhead = 30) {
        const now = new Date();
        const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
        return this.prisma.customerProduct.findMany({
            where: {
                warranty_end_at: {
                    gte: now,
                    lte: futureDate,
                },
            },
            include: {
                customer: true,
            },
            orderBy: { warranty_end_at: 'asc' },
        });
    }
};
exports.WarrantiesService = WarrantiesService;
exports.WarrantiesService = WarrantiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarrantiesService);
//# sourceMappingURL=warranties.service.js.map