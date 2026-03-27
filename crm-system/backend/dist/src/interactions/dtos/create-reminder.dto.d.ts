export declare enum ReminderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class CreateReminderDto {
    customer_id: string;
    interaction_id?: string;
    title: string;
    description?: string;
    follow_up_at: string;
    owner_id?: string;
}
export declare class UpdateReminderDto {
    status?: ReminderStatus;
    title?: string;
    description?: string;
}
export declare class ReminderDto {
    id: string;
    customer_id: string;
    interaction_id: string;
    title: string;
    description: string;
    follow_up_at: Date;
    status: ReminderStatus;
    created_at: Date;
    updated_at: Date;
}
