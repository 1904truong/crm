export declare enum ZnsTemplateStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING_APPROVAL = "PENDING_APPROVAL",
    REJECTED = "REJECTED"
}
export declare class CreateZnsTemplateDto {
    name: string;
    zalo_template_id: string;
    content: string;
    variables: string[];
    status?: ZnsTemplateStatus;
}
export declare class ZnsTemplateDto {
    id: string;
    name: string;
    zalo_template_id: string;
    content: string;
    variables: string[];
    status: ZnsTemplateStatus;
    created_at: Date;
    updated_at: Date;
}
