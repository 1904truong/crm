import { WarrantiesService } from './warranties.service';
import { CreateWarrantyCaseDto, UpdateWarrantyCaseDto } from './dtos';
export declare class WarrantiesController {
    private warrantiesService;
    constructor(warrantiesService: WarrantiesService);
    createCase(dto: CreateWarrantyCaseDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        status: import("@prisma/client").$Enums.WarrantyStatus;
        customer_product_id: string;
        issue_description: string;
        resolution: string | null;
        opened_at: Date;
        closed_at: Date | null;
    }>;
    getCasesByCustomer(customerId: string): Promise<({
        customer_product: {
            customer: {
                id: string;
                full_name: string;
                is_active: boolean;
                created_at: Date;
                updated_at: Date;
                code: string;
                phone_primary: string | null;
                email_primary: string | null;
                customer_type: import("@prisma/client").$Enums.CustomerType;
                segment: import("@prisma/client").$Enums.Segment;
                source: string | null;
                notes: string | null;
                dob: Date | null;
                owner_id: string | null;
            };
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
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        status: import("@prisma/client").$Enums.WarrantyStatus;
        customer_product_id: string;
        issue_description: string;
        resolution: string | null;
        opened_at: Date;
        closed_at: Date | null;
    })[]>;
    getExpiringWarranties(days?: number): Promise<({
        customer: {
            id: string;
            full_name: string;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            code: string;
            phone_primary: string | null;
            email_primary: string | null;
            customer_type: import("@prisma/client").$Enums.CustomerType;
            segment: import("@prisma/client").$Enums.Segment;
            source: string | null;
            notes: string | null;
            dob: Date | null;
            owner_id: string | null;
        };
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
    getCaseById(id: string): Promise<({
        customer_product: {
            customer: {
                id: string;
                full_name: string;
                is_active: boolean;
                created_at: Date;
                updated_at: Date;
                code: string;
                phone_primary: string | null;
                email_primary: string | null;
                customer_type: import("@prisma/client").$Enums.CustomerType;
                segment: import("@prisma/client").$Enums.Segment;
                source: string | null;
                notes: string | null;
                dob: Date | null;
                owner_id: string | null;
            };
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
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        status: import("@prisma/client").$Enums.WarrantyStatus;
        customer_product_id: string;
        issue_description: string;
        resolution: string | null;
        opened_at: Date;
        closed_at: Date | null;
    }) | null>;
    updateCase(id: string, dto: UpdateWarrantyCaseDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        status: import("@prisma/client").$Enums.WarrantyStatus;
        customer_product_id: string;
        issue_description: string;
        resolution: string | null;
        opened_at: Date;
        closed_at: Date | null;
    }>;
}
