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
exports.WarrantyCaseDto = exports.UpdateWarrantyCaseDto = exports.CreateWarrantyCaseDto = exports.WarrantyStatus = void 0;
const class_validator_1 = require("class-validator");
var WarrantyStatus;
(function (WarrantyStatus) {
    WarrantyStatus["OPEN"] = "OPEN";
    WarrantyStatus["IN_PROGRESS"] = "IN_PROGRESS";
    WarrantyStatus["RESOLVED"] = "RESOLVED";
    WarrantyStatus["CLOSED"] = "CLOSED";
})(WarrantyStatus || (exports.WarrantyStatus = WarrantyStatus = {}));
class CreateWarrantyCaseDto {
    customer_product_id;
    issue_description;
    resolution;
}
exports.CreateWarrantyCaseDto = CreateWarrantyCaseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWarrantyCaseDto.prototype, "customer_product_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWarrantyCaseDto.prototype, "issue_description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWarrantyCaseDto.prototype, "resolution", void 0);
class UpdateWarrantyCaseDto {
    status;
    resolution;
}
exports.UpdateWarrantyCaseDto = UpdateWarrantyCaseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(WarrantyStatus),
    __metadata("design:type", String)
], UpdateWarrantyCaseDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWarrantyCaseDto.prototype, "resolution", void 0);
class WarrantyCaseDto {
    id;
    customer_product_id;
    status;
    issue_description;
    resolution;
    opened_at;
    closed_at;
    created_at;
    updated_at;
}
exports.WarrantyCaseDto = WarrantyCaseDto;
//# sourceMappingURL=create-warranty-case.dto.js.map