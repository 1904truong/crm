import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWarrantyCaseDto, UpdateWarrantyCaseDto } from './dtos';
import { Prisma } from '@prisma/client';

@Injectable()
export class WarrantiesService {
  constructor(private prisma: PrismaService) {}

  async createWarrantyCase(dto: CreateWarrantyCaseDto) {
    const product = await this.prisma.customerProduct.findUnique({
      where: { id: dto.customer_product_id },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const now = new Date();
    if (product.warranty_end_at < now) {
      throw new BadRequestException('Product warranty has expired');
    }

    return this.prisma.warrantyCase.create({
      data: {
        customer_product_id: dto.customer_product_id,
        issue_description: dto.issue_description,
        status: 'OPEN',
      },
    });
  }

  async getWarrantyCases(customerId: string) {
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

  async getWarrantyCaseById(id: string) {
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

  async updateWarrantyCase(id: string, dto: UpdateWarrantyCaseDto) {
    const updateData: Prisma.WarrantyCaseUpdateInput = { ...dto };
    const status = dto.status;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
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
    const futureDate = new Date(
      now.getTime() + daysAhead * 24 * 60 * 60 * 1000,
    );

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
}
