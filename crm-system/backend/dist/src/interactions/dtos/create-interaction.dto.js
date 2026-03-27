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
exports.InteractionDto = exports.CreateInteractionDto = exports.InteractionType = void 0;
const class_validator_1 = require("class-validator");
var InteractionType;
(function (InteractionType) {
    InteractionType["CALL"] = "CALL";
    InteractionType["SMS"] = "SMS";
    InteractionType["ZALO"] = "ZALO";
    InteractionType["EMAIL"] = "EMAIL";
    InteractionType["MEETING"] = "MEETING";
    InteractionType["OTHER"] = "OTHER";
})(InteractionType || (exports.InteractionType = InteractionType = {}));
class CreateInteractionDto {
    customer_id;
    type;
    content;
    owner_id;
    follow_up_date;
}
exports.CreateInteractionDto = CreateInteractionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "customer_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(InteractionType),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "owner_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInteractionDto.prototype, "follow_up_date", void 0);
class InteractionDto {
    id;
    customer_id;
    type;
    content;
    owner_id;
    created_at;
    updated_at;
}
exports.InteractionDto = InteractionDto;
//# sourceMappingURL=create-interaction.dto.js.map