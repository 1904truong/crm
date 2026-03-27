export declare enum TriggerType {
    CRON = "CRON",
    WARRANTY_ENDING = "WARRANTY_ENDING",
    CUSTOMER_CREATED = "CUSTOMER_CREATED",
    PURCHASE_MADE = "PURCHASE_MADE"
}
export declare enum ActionType {
    SEND_ZNS = "SEND_ZNS",
    CREATE_REMINDER = "CREATE_REMINDER",
    SEND_EMAIL = "SEND_EMAIL",
    WEBHOOK = "WEBHOOK"
}
export declare class CreateAutomationRuleDto {
    name: string;
    description?: string;
    trigger_type: TriggerType;
    trigger_config: Record<string, any>;
    action_type: ActionType;
    action_config: Record<string, any>;
    is_active?: boolean;
}
export declare class AutomationRuleDto {
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
