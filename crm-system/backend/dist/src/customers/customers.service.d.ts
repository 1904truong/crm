import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dtos';
import { PaginationDto, PaginatedResponse } from '../common/dtos';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCustomerDto): Promise<{
        contacts: {
            id: string;
            created_at: Date;
            type: import("@prisma/client").$Enums.ContactType;
            value: string;
            is_primary: boolean;
            customer_id: string;
        }[];
    } & {
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
    }>;
    findAll(pagination: PaginationDto & {
        customer_type?: string;
        is_active?: boolean;
    }): Promise<PaginatedResponse<any>>;
    findOne(id: string): Promise<{
        interactions: ({
            owner: {
                id: string;
                email: string;
                full_name: string;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            owner_id: string;
            type: import("@prisma/client").$Enums.InteractionType;
            customer_id: string;
            content: string;
        })[];
        contacts: {
            id: string;
            created_at: Date;
            type: import("@prisma/client").$Enums.ContactType;
            value: string;
            is_primary: boolean;
            customer_id: string;
        }[];
        purchases: ({
            products: ({
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
            })[];
        } & {
            id: string;
            created_at: Date;
            source: string | null;
            notes: string | null;
            customer_id: string;
            purchase_date: Date;
        })[];
        reminders: {
            id: string;
            created_at: Date;
            updated_at: Date;
            owner_id: string | null;
            customer_id: string;
            status: import("@prisma/client").$Enums.ReminderStatus;
            follow_up_at: Date;
            interaction_id: string | null;
            title: string;
            description: string | null;
        }[];
    } & {
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
    }>;
    update(id: string, dto: UpdateCustomerDto): Promise<{
        contacts: {
            id: string;
            created_at: Date;
            type: import("@prisma/client").$Enums.ContactType;
            value: string;
            is_primary: boolean;
            customer_id: string;
        }[];
    } & {
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
    }>;
    delete(id: string): Promise<{
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
    }>;
    getCustomerStats(id: string): Promise<{
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
        } | null;
        warranty_stats: {
            total_products: number;
            in_warranty: number;
            expired: number;
            expiring_soon: number;
        };
        interaction_count: number;
        warranty_case_count: number;
    }>;
}
