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
exports.CreateCustomerDto = exports.CustomerType = exports.CustomerSegment = void 0;
const class_validator_1 = require("class-validator");
var CustomerSegment;
(function (CustomerSegment) {
    CustomerSegment["VIP"] = "VIP";
    CustomerSegment["NORMAL"] = "NORMAL";
    CustomerSegment["POTENTIAL"] = "POTENTIAL";
})(CustomerSegment || (exports.CustomerSegment = CustomerSegment = {}));
var CustomerType;
(function (CustomerType) {
    CustomerType["PERSONAL"] = "PERSONAL";
    CustomerType["BUSINESS"] = "BUSINESS";
    CustomerType["ENTERPRISE"] = "ENTERPRISE";
})(CustomerType || (exports.CustomerType = CustomerType = {}));
class CreateCustomerDto {
    full_name;
    phone_primary;
    email_primary;
    customer_type = CustomerType.PERSONAL;
    segment = CustomerSegment.NORMAL;
    source;
    notes;
}
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('VN'),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phone_primary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "email_primary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CustomerType),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "customer_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CustomerSegment),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "segment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "notes", void 0);
//# sourceMappingURL=create-customer.dto.js.map