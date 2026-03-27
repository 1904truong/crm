import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAutomationRuleDto } from './dtos';

interface UpdateRuleDto {
  name?: string;
  description?: string;
  trigger_config?: Record<string, unknown>;
  action_config?: Record<string, unknown>;
  is_active?: boolean;
}

@Injectable()
export class AutomationService {
  constructor(private prisma: PrismaService) {}

  async createRule(dto: CreateAutomationRuleDto) {
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
      trigger_config: JSON.parse(rule.trigger_config || '{}') as unknown,
      action_config: JSON.parse(rule.action_config || '{}') as unknown,
    }));
  }

  async getRule(id: string) {
    const rule = await this.prisma.automationRule.findUnique({
      where: { id },
    });

    if (!rule) {
      throw new BadRequestException('Automation rule not found');
    }

    return {
      ...rule,
      trigger_config: JSON.parse(rule.trigger_config || '{}') as unknown,
      action_config: JSON.parse(rule.action_config || '{}') as unknown,
    };
  }

  async updateRule(id: string, dto: UpdateRuleDto) {
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

  async deleteRule(id: string) {
    return this.prisma.automationRule.update({
      where: { id },
      data: { is_active: false },
    });
  }

  async runRule(id: string) {
    await this.getRule(id);

    return this.prisma.automationJobRun.create({
      data: {
        rule_id: id,
        status: 'RUNNING',
      },
    });
  }
}
