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
exports.UpdateCustomerContactDto = exports.CreateCustomerContactDto = exports.CustomerContactDto = exports.ContactType = void 0;
const class_validator_1 = require("class-validator");
var ContactType;
(function (ContactType) {
    ContactType["PHONE"] = "PHONE";
    ContactType["EMAIL"] = "EMAIL";
    ContactType["ZALO"] = "ZALO";
    ContactType["FACEBOOK"] = "FACEBOOK";
})(ContactType || (exports.ContactType = ContactType = {}));
class CustomerContactDto {
    id;
    customer_id;
    type;
    value;
    is_primary;
    created_at;
}
exports.CustomerContactDto = CustomerContactDto;
class CreateCustomerContactDto {
    type;
    value;
    is_primary = false;
}
exports.CreateCustomerContactDto = CreateCustomerContactDto;
__decorate([
    (0, class_validator_1.IsEnum)(ContactType),
    __metadata("design:type", String)
], CreateCustomerContactDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerContactDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCustomerContactDto.prototype, "is_primary", void 0);
class UpdateCustomerContactDto {
    type;
    value;
    is_primary;
}
exports.UpdateCustomerContactDto = UpdateCustomerContactDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ContactType),
    __metadata("design:type", String)
], UpdateCustomerContactDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCustomerContactDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCustomerContactDto.prototype, "is_primary", void 0);
//# sourceMappingURL=customer-contact.dto.js.map