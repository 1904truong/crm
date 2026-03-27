import { ReportsService } from './reports.service';
import type { Response, Request } from 'express';
export declare class ReportsController {
    private reportsService;
    private readonly logger;
    constructor(reportsService: ReportsService);
    getStats(req: Request): Promise<{
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
    exportCustomers(res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
}
