import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalCustomers: number;
        interactionsToday: number;
        warrantiesExpiring: number;
        znsStats: {
            sent: number;
            failed: number;
            total: number;
        };
        recentFollowups: ({
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
            owner_id: string | null;
            customer_id: string;
            status: import("@prisma/client").$Enums.ReminderStatus;
            follow_up_at: Date;
            interaction_id: string | null;
            title: string;
            description: string | null;
        })[];
    }>;
    exportCustomersCsv(): Promise<string>;
}
