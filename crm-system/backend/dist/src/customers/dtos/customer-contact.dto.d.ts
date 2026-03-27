export declare enum ContactType {
    PHONE = "PHONE",
    EMAIL = "EMAIL",
    ZALO = "ZALO",
    FACEBOOK = "FACEBOOK"
}
export declare class CustomerContactDto {
    id: string;
    customer_id: string;
    type: ContactType;
    value: string;
    is_primary: boolean;
    created_at: Date;
}
export declare class CreateCustomerContactDto {
    type: ContactType;
    value: string;
    is_primary?: boolean;
}
export declare class UpdateCustomerContactDto {
    type?: ContactType;
    value?: string;
    is_primary?: boolean;
}
