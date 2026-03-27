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
exports.WarrantyAutomationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const zalo_service_1 = require("../../zns/services/zalo.service");
const interactions_service_1 = require("../../interactions/interactions.service");
const create_interaction_dto_1 = require("../../interactions/dtos/create-interaction.dto");
let WarrantyAutomationService = class WarrantyAutomationService {
    prisma;
    zaloService;
    interactionsService;
    logger = new common_1.Logger('WarrantyAutomationService');
    constructor(prisma, zaloService, interactionsService) {
        this.prisma = prisma;
        this.zaloService = zaloService;
        this.interactionsService = interactionsService;
    }
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
            this.logger.log(`📦 Found ${expiringProducts.length} products expiring soon`);
            for (const product of expiringProducts) {
                const customer = product.customer;
                const phone = customer.contacts[0]?.value;
                if (!phone) {
                    this.logger.warn(`⚠️ No phone for customer ${customer.id}`);
                    continue;
                }
                try {
                    await this.zaloService.sendZNSMessage(customer.id, 'WARRANTY_REMINDER_TEMPLATE_ID', phone, {
                        customer_name: customer.full_name,
                        product_model: product.product_model,
                        warranty_end_date: product.warranty_end_at.toLocaleDateString('vi-VN'),
                        days_remaining: Math.ceil((product.warranty_end_at.getTime() - Date.now()) /
                            (24 * 60 * 60 * 1000)),
                    });
                    this.logger.log(`✅ ZNS sent to ${customer.full_name}`);
                    await this.interactionsService.createInteraction({
                        customer_id: customer.id,
                        type: create_interaction_dto_1.InteractionType.ZALO,
                        content: `Automatic: Warranty reminder for ${product.product_model}`,
                        owner_id: 'SYSTEM',
                    });
                }
                catch (error) {
                    this.logger.error(`❌ Failed to send ZNS`, error);
                }
            }
            this.logger.log('✅ Warranty expiry check completed');
        }
        catch (error) {
            this.logger.error('❌ Warranty automation failed', error);
        }
    }
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
        }
        catch (error) {
            this.logger.error('❌ Follow-up check failed', error);
        }
    }
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
            }));
            const todayBirthdays = birthdayCustomers.filter((c) => {
                if (!c.dob)
                    return false;
                const dob = new Date(c.dob);
                return dob.getMonth() + 1 === month && dob.getDate() === day;
            });
            this.logger.log(`🎂 Found ${todayBirthdays.length} birthdays today`);
            for (const customer of todayBirthdays) {
                const phone = customer.contacts[0]?.value;
                if (!phone)
                    continue;
                try {
                    await this.zaloService.sendZNSMessage(customer.id, 'BIRTHDAY_GREETING_TEMPLATE_ID', phone, { customer_name: customer.full_name });
                    this.logger.log(`🎉 Birthday message sent to ${customer.full_name}`);
                }
                catch (error) {
                    this.logger.error('❌ Failed to send birthday message', error);
                }
            }
        }
        catch (error) {
            this.logger.error('❌ Birthday automation failed', error);
        }
    }
};
exports.WarrantyAutomationService = WarrantyAutomationService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarrantyAutomationService.prototype, "checkExpiringWarranties", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarrantyAutomationService.prototype, "checkFollowUpReminders", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_7AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarrantyAutomationService.prototype, "checkBirthdayReminders", null);
exports.WarrantyAutomationService = WarrantyAutomationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        zalo_service_1.ZaloService,
        interactions_service_1.InteractionsService])
], WarrantyAutomationService);
//# sourceMappingURL=warranty-automation.service.js.map