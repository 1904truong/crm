export declare enum InteractionType {
    CALL = "CALL",
    SMS = "SMS",
    ZALO = "ZALO",
    EMAIL = "EMAIL",
    MEETING = "MEETING",
    OTHER = "OTHER"
}
export declare class CreateInteractionDto {
    customer_id: string;
    type: InteractionType;
    content: string;
    owner_id: string;
    follow_up_date?: string;
}
export declare class InteractionDto {
    id: string;
    customer_id: string;
    type: InteractionType;
    content: string;
    owner_id: string;
    created_at: Date;
    updated_at: Date;
}
