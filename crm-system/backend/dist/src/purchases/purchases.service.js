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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PurchasesService = class PurchasesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPurchase(dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: dto.customer_id },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return this.prisma.purchase.create({
            data: {
                customer_id: dto.customer_id,
                purchase_date: new Date(dto.purchase_date),
                source: dto.source,
                notes: dto.notes,
            },
        });
    }
    async addProductToPurchase(dto) {
        const purchase = await this.prisma.purchase.findUnique({
            where: { id: dto.purchase_id },
        });
        if (!purchase) {
            throw new common_1.BadRequestException('Purchase not found');
        }
        const purchase_date = new Date(dto.purchase_date);
        const warranty_end_at = new Date(purchase_date);
        warranty_end_at.setMonth(warranty_end_at.getMonth() + dto.warranty_months);
        return this.prisma.customerProduct.create({
            data: {
                customer_id: dto.customer_id,
                purchase_id: dto.purchase_id,
                product_model: dto.product_model,
                product_serial: dto.product_serial,
                purchase_date,
                warranty_months: dto.warranty_months,
                warranty_end_at,
            },
        });
    }
    async getPurchaseHistory(customerId) {
        return this.prisma.purchase.findMany({
            where: { customer_id: customerId },
            include: {
                products: true,
            },
            orderBy: { purchase_date: 'desc' },
        });
    }
    async getPurchaseById(id) {
        return this.prisma.purchase.findUnique({
            where: { id },
            include: {
                products: {
                    include: {
                        warranty_cases: true,
                    },
                },
            },
        });
    }
    async getAllProducts() {
        const now = new Date();
        const products = await this.prisma.customerProduct.findMany({
            include: {
                customer: {
                    include: {
                        contacts: { where: { is_primary: true }, take: 1 },
                    },
                },
                warranty_cases: {
                    orderBy: { opened_at: 'desc' },
                    take: 1,
                },
            },
            orderBy: { created_at: 'desc' },
        });
        return products.map((p) => {
            const warrantyEnd = new Date(p.warranty_end_at);
            const daysLeft = Math.ceil((warrantyEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            let warranty_status;
            if (daysLeft < 0)
                warranty_status = 'EXPIRED';
            else if (daysLeft <= 30)
                warranty_status = 'EXPIRING_SOON';
            else
                warranty_status = 'ACTIVE';
            return { ...p, warranty_status, warranty_days_left: daysLeft };
        });
    }
    async getProductById(id) {
        const now = new Date();
        const p = await this.prisma.customerProduct.findUnique({
            where: { id },
            include: {
                customer: {
                    include: {
                        contacts: true,
                    },
                },
                purchase: true,
                warranty_cases: {
                    orderBy: { opened_at: 'desc' },
                },
            },
        });
        if (!p)
            throw new common_1.BadRequestException('Product not found');
        const daysLeft = Math.ceil((new Date(p.warranty_end_at).getTime() - now.getTime()) /
            (1000 * 60 * 60 * 24));
        return {
            ...p,
            warranty_days_left: daysLeft,
            warranty_status: daysLeft < 0 ? 'EXPIRED' : daysLeft <= 30 ? 'EXPIRING_SOON' : 'ACTIVE',
        };
    }
    async createPurchaseForCustomer(customerId, dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer)
            throw new common_1.BadRequestException('Customer not found');
        return this.prisma.purchase.create({
            data: {
                customer_id: customerId,
                purchase_date: dto.purchase_date
                    ? new Date(dto.purchase_date)
                    : new Date(),
                source: dto.source,
                notes: dto.notes,
            },
        });
    }
    async createPurchaseWithProduct(customerId, dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer)
            throw new common_1.BadRequestException('Customer not found');
        const purchase_date = dto.purchase_date
            ? new Date(dto.purchase_date)
            : new Date();
        const warranty_months = dto.warranty_months ?? 24;
        const warranty_end_at = new Date(purchase_date);
        warranty_end_at.setMonth(warranty_end_at.getMonth() + warranty_months);
        return this.prisma.$transaction(async (tx) => {
            const purchase = await tx.purchase.create({
                data: {
                    customer_id: customerId,
                    purchase_date,
                    source: dto.source ?? 'Trực tiếp',
                    notes: dto.notes,
                },
            });
            const product = await tx.customerProduct.create({
                data: {
                    customer_id: customerId,
                    purchase_id: purchase.id,
                    product_model: dto.product_model,
                    product_serial: dto.product_serial,
                    purchase_date,
                    warranty_months,
                    warranty_end_at,
                },
                include: {
                    customer: true,
                    purchase: true,
                },
            });
            return product;
        });
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map