import { AutomationService } from './automation.service';
import { CreateAutomationRuleDto } from './dtos';
export declare class AutomationController {
    private automationService;
    constructor(automationService: AutomationService);
    createRule(dto: CreateAutomationRuleDto): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        trigger_type: import("@prisma/client").$Enums.TriggerType;
        trigger_config: string;
        action_type: import("@prisma/client").$Enums.ActionType;
        action_config: string;
    }>;
    getRules(): Promise<{
        trigger_config: unknown;
        action_config: unknown;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        trigger_type: import("@prisma/client").$Enums.TriggerType;
        action_type: import("@prisma/client").$Enums.ActionType;
    }[]>;
    getRule(id: string): Promise<{
        trigger_config: unknown;
        action_config: unknown;
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        trigger_type: import("@prisma/client").$Enums.TriggerType;
        action_type: import("@prisma/client").$Enums.ActionType;
    }>;
    updateRule(id: string, dto: any): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        trigger_type: import("@prisma/client").$Enums.TriggerType;
        trigger_config: string;
        action_type: import("@prisma/client").$Enums.ActionType;
        action_config: string;
    }>;
    deleteRule(id: string): Promise<{
        id: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        name: string;
        description: string | null;
        trigger_type: import("@prisma/client").$Enums.TriggerType;
        trigger_config: string;
        action_type: import("@prisma/client").$Enums.ActionType;
        action_config: string;
    }>;
    runRule(id: string): Promise<{
        id: string;
        created_at: Date;
        status: import("@prisma/client").$Enums.JobStatus;
        error_message: string | null;
        executed_at: Date | null;
        rule_id: string;
    }>;
}
