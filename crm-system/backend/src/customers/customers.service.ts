import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dtos';
import { ContactType, Prisma } from '@prisma/client';
import { PaginationDto, PaginatedResponse } from '../common/dtos';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    // Check for duplicate phone number
    if (dto.phone_primary) {
      const existing = await this.prisma.customer.findFirst({
        where: { phone_primary: dto.phone_primary },
      });
      if (existing) {
        throw new BadRequestException(
          'Customer with this phone number already exists',
        );
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
                    type: 'PHONE' as ContactType,
                    value: dto.phone_primary,
                    is_primary: true,
                  },
                ]
              : []),
            ...(dto.email_primary
              ? [
                  {
                    type: 'EMAIL' as ContactType,
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

  async findAll(
    pagination: PaginationDto & { customer_type?: string; is_active?: boolean },
  ) {
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const skip = (page - 1) * limit;
    const where: Prisma.CustomerWhereInput = {};

    // Filter by active status if provided, otherwise default to active only if not explicitly searching for inactive
    if (pagination.is_active !== undefined) {
      where.is_active = pagination.is_active;
    } else {
      where.is_active = true;
    }

    if (pagination.customer_type && pagination.customer_type !== 'ALL') {
      where.customer_type =
        pagination.customer_type as Prisma.EnumCustomerTypeFilter;
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
          [pagination.sortBy || 'created_at']:
            (pagination.sortOrder?.toLowerCase() || 'desc') as Prisma.SortOrder,
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
    } as PaginatedResponse<any>;
  }

  async findOne(id: string) {
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
      throw new BadRequestException('Customer not found');
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: dto,
      include: {
        contacts: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.customer.update({
      where: { id },
      data: { is_active: false },
    });
  }

  async getCustomerStats(id: string) {
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
      expiring_soon: products.filter(
        (p) =>
          p.warranty_end_at > now &&
          p.warranty_end_at <=
            new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      ).length,
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
}
