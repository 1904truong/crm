import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateInteractionDto,
  CreateReminderDto,
  UpdateReminderDto,
} from './dtos';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async createInteraction(dto: CreateInteractionDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customer_id },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    return this.prisma.interaction.create({
      data: {
        customer_id: dto.customer_id,
        type: dto.type,
        content: dto.content,
        owner_id: dto.owner_id,
      },
      include: {
        owner: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  async getInteractionHistory(customerId: string) {
    return this.prisma.interaction.findMany({
      where: { customer_id: customerId },
      include: {
        owner: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async createReminder(dto: CreateReminderDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customer_id },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    return this.prisma.reminder.create({
      data: {
        customer_id: dto.customer_id,
        interaction_id: dto.interaction_id,
        title: dto.title,
        description: dto.description,
        follow_up_at: new Date(dto.follow_up_at),
        status: 'PENDING',
        owner_id: dto.owner_id,
      },
    });
  }

  async getReminders(customerId: string) {
    return this.prisma.reminder.findMany({
      where: {
        customer_id: customerId,
        status: { in: ['PENDING'] },
      },
      orderBy: { follow_up_at: 'asc' },
    });
  }

  async getPendingReminders() {
    const now = new Date();
    return this.prisma.reminder.findMany({
      where: {
        status: 'PENDING',
        follow_up_at: { lte: now },
      },
      include: {
        customer: true,
      },
      orderBy: { follow_up_at: 'asc' },
    });
  }

  async updateReminder(id: string, dto: UpdateReminderDto) {
    return this.prisma.reminder.update({
      where: { id },
      data: dto,
    });
  }
}
