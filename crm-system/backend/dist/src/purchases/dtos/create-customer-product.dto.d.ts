export declare class CreateCustomerProductDto {
    customer_id: string;
    purchase_id?: string;
    product_model: string;
    product_serial?: string;
    purchase_date: string;
    warranty_months: number;
}
export declare class CustomerProductDto {
    id: string;
    customer_id: string;
    purchase_id: string;
    product_model: string;
    product_serial: string;
    purchase_date: Date;
    warranty_months: number;
    warranty_end_at: Date;
    created_at: Date;
    updated_at: Date;
}
