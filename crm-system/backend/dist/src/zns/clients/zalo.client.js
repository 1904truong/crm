"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloClient = void 0;
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
class ZaloClient {
    appId;
    appSecret;
    oaId;
    logger = new common_1.Logger('ZaloClient');
    httpClient;
    accessToken;
    tokenExpireAt;
    constructor(appId, appSecret, oaId) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.oaId = oaId;
        this.httpClient = axios_1.default.create({
            baseURL: 'https://openapi.zalo.me/v3.0',
            timeout: 10000,
        });
    }
    async getAccessToken() {
        if (this.accessToken && this.tokenExpireAt > new Date()) {
            return this.accessToken;
        }
        try {
            const response = await this.httpClient.post('/oa/login', {
                app_id: this.appId,
                app_secret: this.appSecret,
            });
            this.accessToken = response.data.access_token;
            this.tokenExpireAt = new Date(Date.now() + response.data.expires_in * 1000);
            this.logger.log('✅ Zalo Access Token renewed');
            return this.accessToken;
        }
        catch (error) {
            this.logger.error('❌ Failed to get Zalo access token', error);
            throw error;
        }
    }
    async sendZNS(phoneNumber, templateId, variables) {
        try {
            const token = await this.getAccessToken();
            const response = await this.httpClient.post(`/oa/${this.oaId}/sendmessage`, {
                recipient: { phone_number: phoneNumber },
                message: {
                    template_type: 'zns',
                    template_id: templateId,
                    template_data: variables,
                },
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const messageId = response.data.message_id ?? '';
            this.logger.log(`✅ ZNS sent to ${phoneNumber}: ${messageId}`);
            return {
                messageId,
                status: 'SENT',
            };
        }
        catch (error) {
            this.logger.error(`❌ Failed to send ZNS to ${phoneNumber}`, error);
            throw error;
        }
    }
    validateWebhookSignature(body, signature) {
        const hmac = crypto.createHmac('sha256', this.appSecret);
        hmac.update(body);
        const computedSignature = hmac.digest('hex');
        return computedSignature === signature;
    }
}
exports.ZaloClient = ZaloClient;
//# sourceMappingURL=zalo.client.js.map