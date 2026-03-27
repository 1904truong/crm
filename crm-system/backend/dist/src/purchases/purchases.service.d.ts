import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto, CreateCustomerProductDto } from './dtos';
export declare class PurchasesService {
    private prisma;
    constructor(prisma: PrismaService);
    createPurchase(dto: CreatePurchaseDto): Promise<{
        id: string;
        purchase_date: Date;
        source: string | null;
        notes: string | null;
        created_at: Date;
        customer_id: string;
    }>;
    addProductToPurchase(dto: CreateCustomerProductDto): Promise<{
        id: string;
        purchase_date: Date;
        created_at: Date;
        customer_id: string;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        updated_at: Date;
        purchase_id: string;
    }>;
    getPurchaseHistory(customerId: string): Promise<({
        products: {
            id: string;
            purchase_date: Date;
            created_at: Date;
            customer_id: string;
            product_model: string;
            product_serial: string | null;
            warranty_months: number;
            warranty_end_at: Date;
            updated_at: Date;
            purchase_id: string;
        }[];
    } & {
        id: string;
        purchase_date: Date;
        source: string | null;
        notes: string | null;
        created_at: Date;
        customer_id: string;
    })[]>;
    getPurchaseById(id: string): Promise<({
        products: ({
            warranty_cases: {
                id: string;
                created_at: Date;
                updated_at: Date;
                customer_product_id: string;
                status: import("@prisma/client").$Enums.WarrantyStatus;
                issue_description: string;
                resolution: string | null;
                opened_at: Date;
                closed_at: Date | null;
            }[];
        } & {
            id: string;
            purchase_date: Date;
            created_at: Date;
            customer_id: string;
            product_model: string;
            product_serial: string | null;
            warranty_months: number;
            warranty_end_at: Date;
            updated_at: Date;
            purchase_id: string;
        })[];
    } & {
        id: string;
        purchase_date: Date;
        source: string | null;
        notes: string | null;
        created_at: Date;
        customer_id: string;
    }) | null>;
    getAllProducts(): Promise<{
        warranty_status: string;
        warranty_days_left: number;
        customer: {
            contacts: {
                id: string;
                created_at: Date;
                customer_id: string;
                is_primary: boolean;
                type: import("@prisma/client").$Enums.ContactType;
                value: string;
            }[];
        } & {
            id: string;
            source: string | null;
            notes: string | null;
            created_at: Date;
            updated_at: Date;
            code: string;
            full_name: string;
            phone_primary: string | null;
            email_primary: string | null;
            customer_type: import("@prisma/client").$Enums.CustomerType;
            segment: import("@prisma/client").$Enums.Segment;
            dob: Date | null;
            is_active: boolean;
            owner_id: string | null;
        };
        warranty_cases: {
            id: string;
            created_at: Date;
            updated_at: Date;
            customer_product_id: string;
            status: import("@prisma/client").$Enums.WarrantyStatus;
            issue_description: string;
            resolution: string | null;
            opened_at: Date;
            closed_at: Date | null;
        }[];
        id: string;
        purchase_date: Date;
        created_at: Date;
        customer_id: string;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        updated_at: Date;
        purchase_id: string;
    }[]>;
    getProductById(id: string): Promise<{
        warranty_days_left: number;
        warranty_status: string;
        customer: {
            contacts: {
                id: string;
                created_at: Date;
                customer_id: string;
                is_primary: boolean;
                type: import("@prisma/client").$Enums.ContactType;
                value: string;
            }[];
        } & {
            id: string;
            source: string | null;
            notes: string | null;
            created_at: Date;
            updated_at: Date;
            code: string;
            full_name: string;
            phone_primary: string | null;
            email_primary: string | null;
            customer_type: import("@prisma/client").$Enums.CustomerType;
            segment: import("@prisma/client").$Enums.Segment;
            dob: Date | null;
            is_active: boolean;
            owner_id: string | null;
        };
        purchase: {
            id: string;
            purchase_date: Date;
            source: string | null;
            notes: string | null;
            created_at: Date;
            customer_id: string;
        };
        warranty_cases: {
            id: string;
            created_at: Date;
            updated_at: Date;
            customer_product_id: string;
            status: import("@prisma/client").$Enums.WarrantyStatus;
            issue_description: string;
            resolution: string | null;
            opened_at: Date;
            closed_at: Date | null;
        }[];
        id: string;
        purchase_date: Date;
        created_at: Date;
        customer_id: string;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        updated_at: Date;
        purchase_id: string;
    }>;
    createPurchaseForCustomer(customerId: string, dto: {
        purchase_date?: string;
        source?: string;
        notes?: string;
    }): Promise<{
        id: string;
        purchase_date: Date;
        source: string | null;
        notes: string | null;
        created_at: Date;
        customer_id: string;
    }>;
    createPurchaseWithProduct(customerId: string, dto: {
        product_model: string;
        product_serial?: string;
        purchase_date?: string;
        warranty_months?: number;
        source?: string;
        notes?: string;
    }): Promise<{
        customer: {
            id: string;
            source: string | null;
            notes: string | null;
            created_at: Date;
            updated_at: Date;
            code: string;
            full_name: string;
            phone_primary: string | null;
            email_primary: string | null;
            customer_type: import("@prisma/client").$Enums.CustomerType;
            segment: import("@prisma/client").$Enums.Segment;
            dob: Date | null;
            is_active: boolean;
            owner_id: string | null;
        };
        purchase: {
            id: string;
            purchase_date: Date;
            source: string | null;
            notes: string | null;
            created_at: Date;
            customer_id: string;
        };
    } & {
        id: string;
        purchase_date: Date;
        created_at: Date;
        customer_id: string;
        product_model: string;
        product_serial: string | null;
        warranty_months: number;
        warranty_end_at: Date;
        updated_at: Date;
        purchase_id: string;
    }>;
}
