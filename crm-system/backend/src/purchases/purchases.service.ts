import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto, CreateCustomerProductDto } from './dtos';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async createPurchase(dto: CreatePurchaseDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customer_id },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
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

  async addProductToPurchase(dto: CreateCustomerProductDto) {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id: dto.purchase_id },
    });

    if (!purchase) {
      throw new BadRequestException('Purchase not found');
    }

    const purchase_date = new Date(dto.purchase_date);
    const warranty_end_at = new Date(purchase_date);
    warranty_end_at.setMonth(warranty_end_at.getMonth() + dto.warranty_months);

    return this.prisma.customerProduct.create({
      data: {
        customer_id: dto.customer_id,
        purchase_id: dto.purchase_id!,
        product_model: dto.product_model,
        product_serial: dto.product_serial,
        purchase_date,
        warranty_months: dto.warranty_months,
        warranty_end_at,
      },
    });
  }

  async getPurchaseHistory(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customer_id: customerId },
      include: {
        products: true,
      },
      orderBy: { purchase_date: 'desc' },
    });
  }

  async getPurchaseById(id: string) {
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

  // GET /purchases/products — all customer products with customer info & warranty status
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
      const daysLeft = Math.ceil(
        (warrantyEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      let warranty_status: string;
      if (daysLeft < 0) warranty_status = 'EXPIRED';
      else if (daysLeft <= 30) warranty_status = 'EXPIRING_SOON';
      else warranty_status = 'ACTIVE';

      return { ...p, warranty_status, warranty_days_left: daysLeft };
    });
  }

  // GET /purchases/products/:id — single product with full detail
  async getProductById(id: string) {
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

    if (!p) throw new BadRequestException('Product not found');

    const daysLeft = Math.ceil(
      (new Date(p.warranty_end_at).getTime() - now.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return {
      ...p,
      warranty_days_left: daysLeft,
      warranty_status:
        daysLeft < 0 ? 'EXPIRED' : daysLeft <= 30 ? 'EXPIRING_SOON' : 'ACTIVE',
    };
  }

  // POST /purchases/customers/:customerId — create a purchase for a customer
  async createPurchaseForCustomer(
    customerId: string,
    dto: { purchase_date?: string; source?: string; notes?: string },
  ) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) throw new BadRequestException('Customer not found');

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

  // POST /purchases/customers/:customerId/products — create purchase + product in one step
  async createPurchaseWithProduct(
    customerId: string,
    dto: {
      product_model: string;
      product_serial?: string;
      purchase_date?: string;
      warranty_months?: number;
      source?: string;
      notes?: string;
    },
  ) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) throw new BadRequestException('Customer not found');

    const purchase_date = dto.purchase_date
      ? new Date(dto.purchase_date)
      : new Date();
    const warranty_months = dto.warranty_months ?? 24;
    const warranty_end_at = new Date(purchase_date);
    warranty_end_at.setMonth(warranty_end_at.getMonth() + warranty_months);

    // Use a transaction: create purchase then product
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
}
