import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
interface WebhookData {
    message_id: string;
    status: string;
    timestamp: number;
}
export declare class ZaloService {
    private prisma;
    private configService;
    private zaloClient;
    private readonly logger;
    constructor(prisma: PrismaService, configService: ConfigService);
    sendZNSMessage(customerId: string, templateId: string, phoneNumber: string, payload: Record<string, unknown>): Promise<{
        success: boolean;
        messageId: string;
    }>;
    handleWebhookCallback(webhookData: WebhookData): Promise<{
        success: boolean;
    }>;
}
export {};
