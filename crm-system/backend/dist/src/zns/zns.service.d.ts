import { PrismaService } from '../prisma/prisma.service';
import { CreateZnsTemplateDto, SendZnsMessageDto } from './dtos';
import { ZnsStatus } from '@prisma/client';
export declare class ZnsService {
    private prisma;
    constructor(prisma: PrismaService);
    createTemplate(dto: CreateZnsTemplateDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        zalo_template_id: string;
        content: string;
        variables: string;
        status: import("@prisma/client").$Enums.ZnsTemplateStatus;
    }>;
    getTemplates(): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        zalo_template_id: string;
        content: string;
        variables: string;
        status: import("@prisma/client").$Enums.ZnsTemplateStatus;
    }[]>;
    sendZnsMessage(dto: SendZnsMessageDto): Promise<{
        id: string;
        created_at: Date;
        customer_id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        template_id: string;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
    }>;
    getZnsLogs(customerId: string): Promise<({
        template: {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            zalo_template_id: string;
            content: string;
            variables: string;
            status: import("@prisma/client").$Enums.ZnsTemplateStatus;
        };
    } & {
        id: string;
        created_at: Date;
        customer_id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        template_id: string;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
    })[]>;
    updateZnsStatus(messageId: string, status: ZnsStatus, zaloMsgId?: string): Promise<{
        id: string;
        created_at: Date;
        customer_id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        template_id: string;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
    }>;
    getQueuedMessages(): Promise<({
        customer: {
            id: string;
            full_name: string;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            code: string;
            phone_primary: string | null;
            email_primary: string | null;
            customer_type: import("@prisma/client").$Enums.CustomerType;
            segment: import("@prisma/client").$Enums.Segment;
            source: string | null;
            notes: string | null;
            dob: Date | null;
            owner_id: string | null;
        };
        template: {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            zalo_template_id: string;
            content: string;
            variables: string;
            status: import("@prisma/client").$Enums.ZnsTemplateStatus;
        };
    } & {
        id: string;
        created_at: Date;
        customer_id: string;
        status: import("@prisma/client").$Enums.ZnsStatus;
        template_id: string;
        phone_number: string;
        payload: string;
        zalo_msg_id: string | null;
        error_code: string | null;
        sent_at: Date | null;
        delivered_at: Date | null;
    })[]>;
}
