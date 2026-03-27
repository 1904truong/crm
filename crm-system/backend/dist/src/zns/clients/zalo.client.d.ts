export declare class ZaloClient {
    private readonly appId;
    private readonly appSecret;
    private readonly oaId;
    private readonly logger;
    private readonly httpClient;
    private accessToken;
    private tokenExpireAt;
    constructor(appId: string, appSecret: string, oaId: string);
    getAccessToken(): Promise<string>;
    sendZNS(phoneNumber: string, templateId: string, variables: Record<string, unknown>): Promise<{
        messageId: string;
        status: string;
    }>;
    validateWebhookSignature(body: string, signature: string): boolean;
}
