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
exports.AutomationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AutomationService = class AutomationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRule(dto) {
        return this.prisma.automationRule.create({
            data: {
                name: dto.name,
                description: dto.description,
                trigger_type: dto.trigger_type,
                trigger_config: JSON.stringify(dto.trigger_config),
                action_type: dto.action_type,
                action_config: JSON.stringify(dto.action_config),
                is_active: dto.is_active ?? true,
            },
        });
    }
    async getRules() {
        const rules = await this.prisma.automationRule.findMany({
            where: { is_active: true },
        });
        return rules.map((rule) => ({
            ...rule,
            trigger_config: JSON.parse(rule.trigger_config || '{}'),
            action_config: JSON.parse(rule.action_config || '{}'),
        }));
    }
    async getRule(id) {
        const rule = await this.prisma.automationRule.findUnique({
            where: { id },
        });
        if (!rule) {
            throw new common_1.BadRequestException('Automation rule not found');
        }
        return {
            ...rule,
            trigger_config: JSON.parse(rule.trigger_config || '{}'),
            action_config: JSON.parse(rule.action_config || '{}'),
        };
    }
    async updateRule(id, dto) {
        return this.prisma.automationRule.update({
            where: { id },
            data: {
                ...dto,
                trigger_config: dto.trigger_config
                    ? JSON.stringify(dto.trigger_config)
                    : undefined,
                action_config: dto.action_config
                    ? JSON.stringify(dto.action_config)
                    : undefined,
            },
        });
    }
    async deleteRule(id) {
        return this.prisma.automationRule.update({
            where: { id },
            data: { is_active: false },
        });
    }
    async runRule(id) {
        await this.getRule(id);
        return this.prisma.automationJobRun.create({
            data: {
                rule_id: id,
                status: 'RUNNING',
            },
        });
    }
};
exports.AutomationService = AutomationService;
exports.AutomationService = AutomationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AutomationService);
//# sourceMappingURL=automation.service.js.map