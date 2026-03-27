import {
  IsString,
  IsObject,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum TriggerType {
  CRON = 'CRON',
  WARRANTY_ENDING = 'WARRANTY_ENDING',
  CUSTOMER_CREATED = 'CUSTOMER_CREATED',
  PURCHASE_MADE = 'PURCHASE_MADE',
}

export enum ActionType {
  SEND_ZNS = 'SEND_ZNS',
  CREATE_REMINDER = 'CREATE_REMINDER',
  SEND_EMAIL = 'SEND_EMAIL',
  WEBHOOK = 'WEBHOOK',
}

export class CreateAutomationRuleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TriggerType)
  trigger_type: TriggerType;

  @IsObject()
  trigger_config: Record<string, any>;

  @IsEnum(ActionType)
  action_type: ActionType;

  @IsObject()
  action_config: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;
}

export class AutomationRuleDto {
  id: string;
  name: string;
  description: string;
  trigger_type: TriggerType;
  trigger_config: Record<string, any>;
  action_type: ActionType;
  action_config: Record<string, any>;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
