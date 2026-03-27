import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ZaloClient } from '../clients/zalo.client';
import { ConfigService } from '@nestjs/config';

interface WebhookData {
  message_id: string;
  status: string;
  timestamp: number;
}

interface ApiError {
  code?: string;
  message?: string;
}

@Injectable()
export class ZaloService {
  private zaloClient: ZaloClient;
  private readonly logger = new Logger('ZaloService');

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const appId = this.configService.get<string>('ZALO_APP_ID') || '';
    const appSecret = this.configService.get<string>('ZALO_APP_SECRET') || '';
    const oaId = this.configService.get<string>('ZALO_OA_ID') || '';

    this.zaloClient = new ZaloClient(appId, appSecret, oaId);
  }

  async sendZNSMessage(
    customerId: string,
    templateId: string,
    phoneNumber: string,
    payload: Record<string, unknown>,
  ) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const template = await this.prisma.znsTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new BadRequestException('Template not found');
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
      const result = await this.zaloClient.sendZNS(
        phoneNumber,
        template.zalo_template_id,
        payload,
      );

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
    } catch (err: unknown) {
      const error = err as ApiError;
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

  async handleWebhookCallback(webhookData: WebhookData) {
    const { message_id, status, timestamp } = webhookData;

    const messageLog = await this.prisma.znsMessageLog.findFirst({
      where: { zalo_msg_id: message_id },
    });

    if (!messageLog) {
      throw new BadRequestException('Message log not found');
    }

    await this.prisma.znsMessageLog.update({
      where: { id: messageLog.id },
      data: {
        status: status === 'DELIVERED' ? 'DELIVERED' : 'FAILED',
        delivered_at:
          status === 'DELIVERED' ? new Date(timestamp * 1000) : null,
      },
    });

    return { success: true };
  }
}
