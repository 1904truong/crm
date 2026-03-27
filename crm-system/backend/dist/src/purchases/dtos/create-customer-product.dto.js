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
exports.CustomerProductDto = exports.CreateCustomerProductDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCustomerProductDto {
    customer_id;
    purchase_id;
    product_model;
    product_serial;
    purchase_date;
    warranty_months = 24;
}
exports.CreateCustomerProductDto = CreateCustomerProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerProductDto.prototype, "customer_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerProductDto.prototype, "purchase_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerProductDto.prototype, "product_model", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerProductDto.prototype, "product_serial", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCustomerProductDto.prototype, "purchase_date", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(360),
    __metadata("design:type", Number)
], CreateCustomerProductDto.prototype, "warranty_months", void 0);
class CustomerProductDto {
    id;
    customer_id;
    purchase_id;
    product_model;
    product_serial;
    purchase_date;
    warranty_months;
    warranty_end_at;
    created_at;
    updated_at;
}
exports.CustomerProductDto = CustomerProductDto;
//# sourceMappingURL=create-customer-product.dto.js.map