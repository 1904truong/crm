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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomersService = class CustomersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        if (dto.phone_primary) {
            const existing = await this.prisma.customer.findFirst({
                where: { phone_primary: dto.phone_primary },
            });
            if (existing) {
                throw new common_1.BadRequestException('Customer with this phone number already exists');
            }
        }
        return this.prisma.customer.create({
            data: {
                code: `CUST-${Date.now()}`,
                full_name: dto.full_name,
                phone_primary: dto.phone_primary,
                email_primary: dto.email_primary,
                customer_type: dto.customer_type || 'PERSONAL',
                segment: dto.segment || 'NORMAL',
                source: dto.source,
                notes: dto.notes,
                contacts: {
                    create: [
                        ...(dto.phone_primary
                            ? [
                                {
                                    type: 'PHONE',
                                    value: dto.phone_primary,
                                    is_primary: true,
                                },
                            ]
                            : []),
                        ...(dto.email_primary
                            ? [
                                {
                                    type: 'EMAIL',
                                    value: dto.email_primary,
                                    is_primary: true,
                                },
                            ]
                            : []),
                    ],
                },
            },
            include: {
                contacts: true,
            },
        });
    }
    async findAll(pagination) {
        const page = pagination.page || 1;
        const limit = pagination.limit || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (pagination.is_active !== undefined) {
            where.is_active = pagination.is_active;
        }
        else {
            where.is_active = true;
        }
        if (pagination.customer_type && pagination.customer_type !== 'ALL') {
            where.customer_type =
                pagination.customer_type;
        }
        if (pagination.search) {
            where.OR = [
                { full_name: { contains: pagination.search, mode: 'insensitive' } },
                { phone_primary: { contains: pagination.search, mode: 'insensitive' } },
                { email_primary: { contains: pagination.search, mode: 'insensitive' } },
                { code: { contains: pagination.search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.customer.findMany({
                where,
                include: {
                    contacts: true,
                    owner: {
                        select: {
                            id: true,
                            full_name: true,
                            email: true,
                        },
                    },
                    products: {
                        select: {
                            id: true,
                            product_model: true,
                            warranty_end_at: true,
                        },
                        take: 3,
                    },
                },
                skip,
                take: limit,
                orderBy: {
                    [pagination.sortBy || 'created_at']: (pagination.sortOrder?.toLowerCase() || 'desc'),
                },
            }),
            this.prisma.customer.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                contacts: true,
                purchases: {
                    include: {
                        products: {
                            include: {
                                warranty_cases: true,
                            },
                        },
                    },
                    orderBy: { purchase_date: 'desc' },
                },
                interactions: {
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
                    take: 10,
                },
                reminders: {
                    where: { status: 'PENDING' },
                    orderBy: { follow_up_at: 'asc' },
                },
            },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        return customer;
    }
    async update(id, dto) {
        return this.prisma.customer.update({
            where: { id },
            data: dto,
            include: {
                contacts: true,
            },
        });
    }
    async delete(id) {
        return this.prisma.customer.update({
            where: { id },
            data: { is_active: false },
        });
    }
    async getCustomerStats(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
        });
        const products = await this.prisma.customerProduct.findMany({
            where: { customer_id: id },
        });
        const now = new Date();
        const warrantyStats = {
            total_products: products.length,
            in_warranty: products.filter((p) => p.warranty_end_at > now).length,
            expired: products.filter((p) => p.warranty_end_at <= now).length,
            expiring_soon: products.filter((p) => p.warranty_end_at > now &&
                p.warranty_end_at <=
                    new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)).length,
        };
        const interactions = await this.prisma.interaction.count({
            where: { customer_id: id },
        });
        const warranty_cases = await this.prisma.warrantyCase.count({
            where: {
                customer_product: {
                    customer_id: id,
                },
            },
        });
        return {
            customer,
            warranty_stats: warrantyStats,
            interaction_count: interactions,
            warranty_case_count: warranty_cases,
        };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map