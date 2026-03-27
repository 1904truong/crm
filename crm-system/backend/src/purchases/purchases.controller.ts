import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto, CreateCustomerProductDto } from './dtos';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  // --- Original endpoints ---

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPurchase(@Body() dto: CreatePurchaseDto) {
    return this.purchasesService.createPurchase(dto);
  }

  @Post(':id/products')
  @HttpCode(HttpStatus.CREATED)
  addProduct(
    @Param('id') purchaseId: string,
    @Body() dto: CreateCustomerProductDto,
  ) {
    return this.purchasesService.addProductToPurchase({
      ...dto,
      purchase_id: purchaseId,
    });
  }

  @Get('customer/:customerId')
  getPurchaseHistory(@Param('customerId') customerId: string) {
    return this.purchasesService.getPurchaseHistory(customerId);
  }

  // --- New endpoints for products page ---

  // GET /purchases/products — all customer products (must come before /:id)
  @Get('products')
  getAllProducts() {
    return this.purchasesService.getAllProducts();
  }

  // GET /purchases/products/:id — single product detail
  @Get('products/:id')
  getProductById(@Param('id') id: string) {
    return this.purchasesService.getProductById(id);
  }

  // POST /purchases/customers/:customerId — create a purchase for a customer
  @Post('customers/:customerId')
  @HttpCode(HttpStatus.CREATED)
  createPurchaseForCustomer(
    @Param('customerId') customerId: string,
    @Body()
    dto: { purchase_date?: string; source?: string; notes?: string },
  ) {
    return this.purchasesService.createPurchaseForCustomer(customerId, dto);
  }

  // GET /purchases/customers/:customerId — purchase history (alias with 's')
  @Get('customers/:customerId')
  getCustomerPurchases(@Param('customerId') customerId: string) {
    return this.purchasesService.getPurchaseHistory(customerId);
  }

  // POST /purchases/customers/:customerId/products — create purchase + product in one step
  @Post('customers/:customerId/products')
  @HttpCode(HttpStatus.CREATED)
  createPurchaseWithProduct(
    @Param('customerId') customerId: string,
    @Body()
    dto: {
      product_model: string;
      product_serial?: string;
      purchase_date?: string;
      warranty_months?: number;
      source?: string;
      notes?: string;
    },
  ) {
    return this.purchasesService.createPurchaseWithProduct(customerId, dto);
  }

  @Get(':id')
  getPurchaseById(@Param('id') id: string) {
    return this.purchasesService.getPurchaseById(id);
  }
}
