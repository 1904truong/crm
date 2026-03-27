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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addProductToPurchase(customerId, purchaseId, data) {
        const warranty_months = data.warranty_months || 24;
        const purchase_date = new Date();
        const warranty_end_at = new Date(purchase_date);
        warranty_end_at.setMonth(warranty_end_at.getMonth() + warranty_months);
        return this.prisma.customerProduct.create({
            data: {
                customer_id: customerId,
                purchase_id: purchaseId,
                product_model: data.product_model,
                product_serial: data.product_serial,
                purchase_date,
                warranty_months,
                warranty_end_at,
            },
        });
    }
    async getCustomerProducts(customerId) {
        return this.prisma.customerProduct.findMany({
            where: { customer_id: customerId },
            include: {
                warranty_cases: true,
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async getWarrantyStatus(customerId) {
        const now = new Date();
        const products = await this.prisma.customerProduct.findMany({
            where: { customer_id: customerId },
        });
        return {
            in_warranty: products.filter((p) => p.warranty_end_at > now).length,
            expired: products.filter((p) => p.warranty_end_at <= now).length,
            expiring_soon: products.filter((p) => p.warranty_end_at > now &&
                p.warranty_end_at <=
                    new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)).length,
        };
    }
    async create(dto) {
        return this.prisma.customerProduct.create({
            data: {
                ...dto,
                purchase_date: dto.purchase_date ?? new Date(),
                warranty_end_at: dto.warranty_end_at ?? new Date(),
            },
        });
    }
    async findAll() {
        return this.prisma.customerProduct.findMany();
    }
    async findOne(id) {
        return this.prisma.customerProduct.findUnique({
            where: { id },
        });
    }
    async update(id, dto) {
        return this.prisma.customerProduct.update({
            where: { id },
            data: dto,
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map