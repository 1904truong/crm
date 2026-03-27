import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createDto: any): Promise<{
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
    update(id: string, updateDto: any): Promise<{
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
