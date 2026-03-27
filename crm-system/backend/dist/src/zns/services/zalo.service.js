"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const zalo_client_1 = require("../clients/zalo.client");
const config_1 = require("@nestjs/config");
let ZaloService = class ZaloService {
    prisma;
    configService;
    zaloClient;
    logger = new common_1.Logger('ZaloService');
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        const appId = this.configService.get('ZALO_APP_ID') || '';
        const appSecret = this.configService.get('ZALO_APP_SECRET') || '';
        const oaId = this.configService.get('ZALO_OA_ID') || '';
        this.zaloClient = new zalo_client_1.ZaloClient(appId, appSecret, oaId);
    }
    async sendZNSMessage(customerId, templateId, phoneNumber, payload) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        const template = await this.prisma.znsTemplate.findUnique({
            where: { id: templateId },
        });
        if (!template) {
            throw new common_1.BadRequestException('Template not found');
        }
        const messageLog = await this.prisma.znsMessageLog.create({
            data: {
                customer_id: customerId,
                template_id: templateId,
                phone_number: phoneNumber,
                payload: JSON.stringify(payload),
                status: 'QUEUED',
            },
        });
        try {
            const result = await this.zaloClient.sendZNS(phoneNumber, template.zalo_template_id, payload);
            await this.prisma.znsMessageLog.update({
                where: { id: messageLog.id },
                data: {
                    status: 'SENT',
                    zalo_msg_id: result.messageId,
                    sent_at: new Date(),
                },
            });
            this.logger.log(`✅ ZNS sent to ${phoneNumber}`);
            return { success: true, messageId: result.messageId };
        }
        catch (err) {
            const error = err;
            await this.prisma.znsMessageLog.update({
                where: { id: messageLog.id },
                data: {
                    status: 'FAILED',
                    error_code: error.code ?? 'UNKNOWN',
                },
            });
            this.logger.error(`❌ Failed to send ZNS`, err);
            throw err;
        }
    }
    async handleWebhookCallback(webhookData) {
        const { message_id, status, timestamp } = webhookData;
        const messageLog = await this.prisma.znsMessageLog.findFirst({
            where: { zalo_msg_id: message_id },
        });
        if (!messageLog) {
            throw new common_1.BadRequestException('Message log not found');
        }
        await this.prisma.znsMessageLog.update({
            where: { id: messageLog.id },
            data: {
                status: status === 'DELIVERED' ? 'DELIVERED' : 'FAILED',
                delivered_at: status === 'DELIVERED' ? new Date(timestamp * 1000) : null,
            },
        });
        return { success: true };
    }
};
exports.ZaloService = ZaloService;
exports.ZaloService = ZaloService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], ZaloService);
//# sourceMappingURL=zalo.service.js.map