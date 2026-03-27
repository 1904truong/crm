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
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    addProductToPurchase(customerId: string, purchaseId: string, data: {
        product_model: string;
        product_serial?: string;
        warranty_months?: number;
    }): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        customer_id: string;
        purchase_date: Date;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        purchase_id: string;
    }>;
    getCustomerProducts(customerId: string): Promise<({
        warranty_cases: {
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("@prisma/client").$Enums.WarrantyStatus;
            customer_product_id: string;
            issue_description: string;
            resolution: string | null;
            opened_at: Date;
            closed_at: Date | null;
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        customer_id: string;
        purchase_date: Date;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        purchase_id: string;
    })[]>;
    getWarrantyStatus(customerId: string): Promise<{
        in_warranty: number;
        expired: number;
        expiring_soon: number;
    }>;
    create(dto: CreateProductDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        customer_id: string;
        purchase_date: Date;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        purchase_id: string;
    }>;
    findAll(): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        customer_id: string;
        purchase_date: Date;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        purchase_id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        customer_id: string;
        purchase_date: Date;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        purchase_id: string;
    } | null>;
    update(id: string, dto: UpdateProductDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        customer_id: string;
        purchase_date: Date;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        purchase_id: string;
    }>;
}
export {};
