export declare enum WarrantyStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED"
}
export declare class CreateWarrantyCaseDto {
    customer_product_id: string;
    issue_description: string;
    resolution?: string;
}
export declare class UpdateWarrantyCaseDto {
    status?: WarrantyStatus;
    resolution?: string;
}
export declare class WarrantyCaseDto {
    id: string;
    customer_product_id: string;
    status: WarrantyStatus;
    issue_description: string;
    resolution: string;
    opened_at: Date;
    closed_at: Date;
    created_at: Date;
    updated_at: Date;
}
