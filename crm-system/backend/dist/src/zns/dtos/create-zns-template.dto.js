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
exports.ZnsTemplateDto = exports.CreateZnsTemplateDto = exports.ZnsTemplateStatus = void 0;
const class_validator_1 = require("class-validator");
var ZnsTemplateStatus;
(function (ZnsTemplateStatus) {
    ZnsTemplateStatus["ACTIVE"] = "ACTIVE";
    ZnsTemplateStatus["INACTIVE"] = "INACTIVE";
    ZnsTemplateStatus["PENDING_APPROVAL"] = "PENDING_APPROVAL";
    ZnsTemplateStatus["REJECTED"] = "REJECTED";
})(ZnsTemplateStatus || (exports.ZnsTemplateStatus = ZnsTemplateStatus = {}));
class CreateZnsTemplateDto {
    name;
    zalo_template_id;
    content;
    variables;
    status = ZnsTemplateStatus.ACTIVE;
}
exports.CreateZnsTemplateDto = CreateZnsTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateZnsTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateZnsTemplateDto.prototype, "zalo_template_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateZnsTemplateDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateZnsTemplateDto.prototype, "variables", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ZnsTemplateStatus),
    __metadata("design:type", String)
], CreateZnsTemplateDto.prototype, "status", void 0);
class ZnsTemplateDto {
    id;
    name;
    zalo_template_id;
    content;
    variables;
    status;
    created_at;
    updated_at;
}
exports.ZnsTemplateDto = ZnsTemplateDto;
//# sourceMappingURL=create-zns-template.dto.js.map