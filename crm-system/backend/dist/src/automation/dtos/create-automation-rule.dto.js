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
exports.AutomationRuleDto = exports.CreateAutomationRuleDto = exports.ActionType = exports.TriggerType = void 0;
const class_validator_1 = require("class-validator");
var TriggerType;
(function (TriggerType) {
    TriggerType["CRON"] = "CRON";
    TriggerType["WARRANTY_ENDING"] = "WARRANTY_ENDING";
    TriggerType["CUSTOMER_CREATED"] = "CUSTOMER_CREATED";
    TriggerType["PURCHASE_MADE"] = "PURCHASE_MADE";
})(TriggerType || (exports.TriggerType = TriggerType = {}));
var ActionType;
(function (ActionType) {
    ActionType["SEND_ZNS"] = "SEND_ZNS";
    ActionType["CREATE_REMINDER"] = "CREATE_REMINDER";
    ActionType["SEND_EMAIL"] = "SEND_EMAIL";
    ActionType["WEBHOOK"] = "WEBHOOK";
})(ActionType || (exports.ActionType = ActionType = {}));
class CreateAutomationRuleDto {
    name;
    description;
    trigger_type;
    trigger_config;
    action_type;
    action_config;
    is_active = true;
}
exports.CreateAutomationRuleDto = CreateAutomationRuleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAutomationRuleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAutomationRuleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TriggerType),
    __metadata("design:type", String)
], CreateAutomationRuleDto.prototype, "trigger_type", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAutomationRuleDto.prototype, "trigger_config", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ActionType),
    __metadata("design:type", String)
], CreateAutomationRuleDto.prototype, "action_type", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAutomationRuleDto.prototype, "action_config", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAutomationRuleDto.prototype, "is_active", void 0);
class AutomationRuleDto {
    id;
    name;
    description;
    trigger_type;
    trigger_config;
    action_type;
    action_config;
    is_active;
    created_at;
    updated_at;
}
exports.AutomationRuleDto = AutomationRuleDto;
//# sourceMappingURL=create-automation-rule.dto.js.map