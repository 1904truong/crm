import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateProductDto {
  customer_id: string;
  purchase_id: string;
  product_model: string;
  product_serial?: string;
  purchase_date?: Date | string;
  warranty_months?: number;
  warranty_end_at?: Date | string;
}

interface UpdateProductDto {
  product_model?: string;
  product_serial?: string;
  warranty_months?: number;
  warranty_end_at?: Date | string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async addProductToPurchase(
    customerId: string,
    purchaseId: string,
    data: {
      product_model: string;
      product_serial?: string;
      warranty_months?: number;
    },
  ) {
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

  async getCustomerProducts(customerId: string) {
    return this.prisma.customerProduct.findMany({
      where: { customer_id: customerId },
      include: {
        warranty_cases: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getWarrantyStatus(customerId: string) {
    const now = new Date();
    const products = await this.prisma.customerProduct.findMany({
      where: { customer_id: customerId },
    });

    return {
      in_warranty: products.filter((p) => p.warranty_end_at > now).length,
      expired: products.filter((p) => p.warranty_end_at <= now).length,
      expiring_soon: products.filter(
        (p) =>
          p.warranty_end_at > now &&
          p.warranty_end_at <=
            new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      ).length,
    };
  }

  async create(dto: CreateProductDto) {
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

  async findOne(id: string) {
    return this.prisma.customerProduct.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    return this.prisma.customerProduct.update({
      where: { id },
      data: dto,
    });
  }
}
