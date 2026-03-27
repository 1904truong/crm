import {
  Controller,
  Post,
  Body,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { ZaloService } from '../services/zalo.service';
import { ZaloClient } from '../clients/zalo.client';

@Controller('webhooks/zalo')
export class ZaloWebhookController {
  constructor(private zaloService: ZaloService) {}

  @Post('zns-status')
  async handleZnsStatusCallback(
    @Body() body: any,
    @Headers('x-zalo-signature') signature: string,
  ) {
    const bodyString = JSON.stringify(body);
    const isValid = new ZaloClient(
      process.env.ZALO_APP_ID || '',
      process.env.ZALO_APP_SECRET || '',
      process.env.ZALO_OA_ID || '',
    ).validateWebhookSignature(bodyString, signature);

    if (!isValid) {
      throw new BadRequestException('Invalid webhook signature');
    }

    return this.zaloService.handleWebhookCallback(body);
  }
}
