export declare enum SendMode {
    MANUAL = "MANUAL",
    AUTO = "AUTO"
}
export declare class SendZnsMessageDto {
    customer_id: string;
    template_id: string;
    phone_number: string;
    payload: Record<string, any>;
    sent_by?: string;
    send_mode?: SendMode;
}
export declare class ZnsMessageLogDto {
    id: string;
    customer_id: string;
    template_id: string;
    phone_number: string;
    payload: Record<string, any>;
    status: string;
    zalo_msg_id: string;
    error_code: string;
    sent_at: Date;
    delivered_at: Date;
    created_at: Date;
}
