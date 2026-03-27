import { ZnsService } from './zns.service';
import { CreateZnsTemplateDto, SendZnsMessageDto } from './dtos';
export declare class ZnsController {
    private znsService;
    constructor(znsService: ZnsService);
    createTemplate(dto: CreateZnsTemplateDto): Promise<{
        id: string;
        name: string;
        zalo_template_id: string;
        content: string;
        variables: string;
        status: import("@prisma/client").$Enums.ZnsTemplateStatus;
        created_at: Date;
        updated_at: Date;
    }>;
    getTemplates(): Promise<{
        id: string;
        name: string;
        zalo_template_id: string;
        content: string;
        variables: string;
        status: import("@prisma/client").$Enums.ZnsTemplateStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    send(dto: SendZnsMessageDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        created_at: Date;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
        customer_id: string;
        template_id: string;
    }>;
    getLogs(customerId: string): Promise<({
        template: {
            id: string;
            name: string;
            zalo_template_id: string;
            content: string;
            variables: string;
            status: import("@prisma/client").$Enums.ZnsTemplateStatus;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        created_at: Date;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
        customer_id: string;
        template_id: string;
    })[]>;
    getQueuedMessages(): Promise<({
        customer: {
            id: string;
            created_at: Date;
            updated_at: Date;
            code: string;
            full_name: string;
            phone_primary: string | null;
            email_primary: string | null;
            customer_type: import("@prisma/client").$Enums.CustomerType;
            segment: import("@prisma/client").$Enums.Segment;
            source: string | null;
            notes: string | null;
            dob: Date | null;
            is_active: boolean;
            owner_id: string | null;
        };
        template: {
            id: string;
            name: string;
            zalo_template_id: string;
            content: string;
            variables: string;
            status: import("@prisma/client").$Enums.ZnsTemplateStatus;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        created_at: Date;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
        customer_id: string;
        template_id: string;
    })[]>;
    updateStatus(id: string, body: {
        status: string;
        zalo_msg_id?: string;
    }): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        created_at: Date;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
        customer_id: string;
        template_id: string;
    }>;
}
