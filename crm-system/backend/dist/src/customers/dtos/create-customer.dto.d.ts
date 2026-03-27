export declare enum CustomerSegment {
    VIP = "VIP",
    NORMAL = "NORMAL",
    POTENTIAL = "POTENTIAL"
}
export declare enum CustomerType {
    PERSONAL = "PERSONAL",
    BUSINESS = "BUSINESS",
    ENTERPRISE = "ENTERPRISE"
}
export declare class CreateCustomerDto {
    full_name: string;
    phone_primary?: string;
    email_primary?: string;
    customer_type?: CustomerType;
    segment?: CustomerSegment;
    source?: string;
    notes?: string;
}
