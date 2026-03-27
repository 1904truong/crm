export declare class CreatePurchaseDto {
    customer_id: string;
    purchase_date: string;
    source?: string;
    notes?: string;
}
export declare class PurchaseDto {
    id: string;
    customer_id: string;
    purchase_date: Date;
    source: string;
    notes: string;
    created_at: Date;
}
