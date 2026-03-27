import { ZaloService } from '../services/zalo.service';
export declare class ZaloWebhookController {
    private zaloService;
    constructor(zaloService: ZaloService);
    handleZnsStatusCallback(body: any, signature: string): Promise<{
        success: boolean;
    }>;
}
