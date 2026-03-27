import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateZnsTemplateDto, SendZnsMessageDto } from './dtos';
import { ZnsStatus, Prisma } from '@prisma/client';

@Injectable()
export class ZnsService {
  constructor(private prisma: PrismaService) {}

  async createTemplate(dto: CreateZnsTemplateDto) {
    const existing = await this.prisma.znsTemplate.findUnique({
      where: { zalo_template_id: dto.zalo_template_id },
    });

    if (existing) {
      throw new BadRequestException(
        'Template with this Zalo ID already exists',
      );
    }

    return this.prisma.znsTemplate.create({
      data: {
        name: dto.name,
        zalo_template_id: dto.zalo_template_id,
        content: dto.content,
        variables: JSON.stringify(dto.variables),
        status: dto.status || 'ACTIVE',
      },
    });
  }

  async getTemplates() {
    return this.prisma.znsTemplate.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { created_at: 'desc' },
    });
  }

  async sendZnsMessage(dto: SendZnsMessageDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customer_id },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const template = await this.prisma.znsTemplate.findUnique({
      where: { id: dto.template_id },
    });

    if (!template) {
      throw new BadRequestException('Template not found');
    }

    return this.prisma.znsMessageLog.create({
      data: {
        customer_id: dto.customer_id,
        template_id: dto.template_id,
        phone_number: dto.phone_number,
        payload: JSON.stringify(dto.payload),
        status: 'QUEUED',
      },
    });
  }

  async getZnsLogs(customerId: string) {
    return this.prisma.znsMessageLog.findMany({
      where: { customer_id: customerId },
      include: {
        template: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async updateZnsStatus(
    messageId: string,
    status: ZnsStatus,
    zaloMsgId?: string,
  ) {
    const updateData: Prisma.ZnsMessageLogUpdateInput = { status };
    if (status === ZnsStatus.SENT) {
      updateData.sent_at = new Date();
    }
    if (status === ZnsStatus.DELIVERED) {
      updateData.delivered_at = new Date();
    }
    if (zaloMsgId) {
      updateData.zalo_msg_id = zaloMsgId;
    }

    return this.prisma.znsMessageLog.update({
      where: { id: messageId },
      data: updateData,
    });
  }

  async getQueuedMessages() {
    return this.prisma.znsMessageLog.findMany({
      where: { status: 'QUEUED' },
      include: {
        customer: true,
        template: true,
      },
      orderBy: { created_at: 'asc' },
      take: 100,
    });
  }
}
