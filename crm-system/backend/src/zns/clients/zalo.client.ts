import axios, { AxiosInstance } from 'axios';
import { Logger } from '@nestjs/common';
import * as crypto from 'crypto';

interface ZaloAccessToken {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

interface ZaloSendZNSResponse {
  message_id?: string;
  [key: string]: unknown;
}

export class ZaloClient {
  private readonly logger = new Logger('ZaloClient');
  private readonly httpClient: AxiosInstance;
  private accessToken: string;
  private tokenExpireAt: Date;

  constructor(
    private readonly appId: string,
    private readonly appSecret: string,
    private readonly oaId: string,
  ) {
    this.httpClient = axios.create({
      baseURL: 'https://openapi.zalo.me/v3.0',
      timeout: 10000,
    });
  }

  async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpireAt > new Date()) {
      return this.accessToken;
    }

    try {
      const response = await this.httpClient.post<ZaloAccessToken>(
        '/oa/login',
        {
          app_id: this.appId,
          app_secret: this.appSecret,
        },
      );

      this.accessToken = response.data.access_token;
      this.tokenExpireAt = new Date(
        Date.now() + response.data.expires_in * 1000,
      );

      this.logger.log('✅ Zalo Access Token renewed');
      return this.accessToken;
    } catch (error) {
      this.logger.error('❌ Failed to get Zalo access token', error);
      throw error;
    }
  }

  async sendZNS(
    phoneNumber: string,
    templateId: string,
    variables: Record<string, unknown>,
  ) {
    try {
      const token = await this.getAccessToken();

      const response = await this.httpClient.post<ZaloSendZNSResponse>(
        `/oa/${this.oaId}/sendmessage`,
        {
          recipient: { phone_number: phoneNumber },
          message: {
            template_type: 'zns',
            template_id: templateId,
            template_data: variables,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const messageId: string = response.data.message_id ?? '';
      this.logger.log(`✅ ZNS sent to ${phoneNumber}: ${messageId}`);

      return {
        messageId,
        status: 'SENT',
      };
    } catch (error) {
      this.logger.error(`❌ Failed to send ZNS to ${phoneNumber}`, error);
      throw error;
    }
  }

  validateWebhookSignature(body: string, signature: string): boolean {
    const hmac = crypto.createHmac('sha256', this.appSecret);
    hmac.update(body);
    const computedSignature: string = hmac.digest('hex');
    return computedSignature === signature;
  }
}
