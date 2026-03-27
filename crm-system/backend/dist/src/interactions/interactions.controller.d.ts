import { InteractionsService } from './interactions.service';
import { CreateInteractionDto, CreateReminderDto, UpdateReminderDto } from './dtos';
export declare class InteractionsController {
    private interactionsService;
    constructor(interactionsService: InteractionsService);
    createInteraction(dto: CreateInteractionDto): Promise<{
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
    }>;
    getHistory(customerId: string): Promise<({
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
    })[]>;
    createReminder(dto: CreateReminderDto): Promise<{
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
    }>;
    getReminders(customerId: string): Promise<{
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
    }[]>;
    getPendingReminders(): Promise<({
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
    })[]>;
    updateReminder(id: string, dto: UpdateReminderDto): Promise<{
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
    }>;
}
