import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { ZaloService } from '../../zns/services/zalo.service';
import { InteractionsService } from '../../interactions/interactions.service';
import { InteractionType } from '../../interactions/dtos/create-interaction.dto';

interface CustomerWithContacts {
  id: string;
  full_name: string;
  dob?: Date | null;
  contacts: Array<{ value: string; type: string; is_primary: boolean }>;
}

@Injectable()
export class WarrantyAutomationService {
  private readonly logger = new Logger('WarrantyAutomationService');

  constructor(
    private prisma: PrismaService,
    private zaloService: ZaloService,
    private interactionsService: InteractionsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async checkExpiringWarranties() {
    this.logger.log('🔍 Starting warranty expiry check...');

    try {
      const expiringProducts = await this.prisma.customerProduct.findMany({
        where: {
          warranty_end_at: {
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            gte: new Date(),
          },
        },
        include: {
          customer: {
            include: {
              contacts: {
                where: { type: 'PHONE', is_primary: true },
              },
            },
          },
        },
      });

      this.logger.log(
        `📦 Found ${expiringProducts.length} products expiring soon`,
      );

      for (const product of expiringProducts) {
        const customer = product.customer;
        const phone = customer.contacts[0]?.value;

        if (!phone) {
          this.logger.warn(`⚠️ No phone for customer ${customer.id}`);
          continue;
        }

        try {
          await this.zaloService.sendZNSMessage(
            customer.id,
            'WARRANTY_REMINDER_TEMPLATE_ID',
            phone,
            {
              customer_name: customer.full_name,
              product_model: product.product_model,
              warranty_end_date:
                product.warranty_end_at.toLocaleDateString('vi-VN'),
              days_remaining: Math.ceil(
                (product.warranty_end_at.getTime() - Date.now()) /
                  (24 * 60 * 60 * 1000),
              ),
            },
          );

          this.logger.log(`✅ ZNS sent to ${customer.full_name}`);

          await this.interactionsService.createInteraction({
            customer_id: customer.id,
            type: InteractionType.ZALO,
            content: `Automatic: Warranty reminder for ${product.product_model}`,
            owner_id: 'SYSTEM',
          });
        } catch (error) {
          this.logger.error(`❌ Failed to send ZNS`, error);
        }
      }

      this.logger.log('✅ Warranty expiry check completed');
    } catch (error) {
      this.logger.error('❌ Warranty automation failed', error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async checkFollowUpReminders() {
    this.logger.log('📌 Checking follow-up reminders...');

    try {
      const reminders = await this.prisma.reminder.findMany({
        where: {
          status: 'PENDING',
          follow_up_at: {
            gte: new Date(Date.now() - 1 * 60 * 60 * 1000),
            lte: new Date(),
          },
        },
        include: { customer: true },
      });

      this.logger.log(`📌 Found ${reminders.length} pending reminders`);
      // TODO: Send notification to owner
    } catch (error) {
      this.logger.error('❌ Follow-up check failed', error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async checkBirthdayReminders() {
    this.logger.log('🎂 Checking birthday reminders...');

    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const birthdayCustomers = (await this.prisma.customer.findMany({
        include: {
          contacts: {
            where: { type: 'PHONE', is_primary: true },
          },
        },
      })) as unknown as CustomerWithContacts[];

      const todayBirthdays = birthdayCustomers.filter(
        (c: CustomerWithContacts) => {
          if (!c.dob) return false;
          const dob = new Date(c.dob);
          return dob.getMonth() + 1 === month && dob.getDate() === day;
        },
      );

      this.logger.log(`🎂 Found ${todayBirthdays.length} birthdays today`);

      for (const customer of todayBirthdays) {
        const phone = customer.contacts[0]?.value;
        if (!phone) continue;

        try {
          await this.zaloService.sendZNSMessage(
            customer.id,
            'BIRTHDAY_GREETING_TEMPLATE_ID',
            phone,
            { customer_name: customer.full_name },
          );

          this.logger.log(`🎉 Birthday message sent to ${customer.full_name}`);
        } catch (error) {
          this.logger.error('❌ Failed to send birthday message', error);
        }
      }
    } catch (error) {
      this.logger.error('❌ Birthday automation failed', error);
    }
  }
}
