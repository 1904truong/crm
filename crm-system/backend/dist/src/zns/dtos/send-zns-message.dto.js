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
exports.ZnsMessageLogDto = exports.SendZnsMessageDto = exports.SendMode = void 0;
const class_validator_1 = require("class-validator");
var SendMode;
(function (SendMode) {
    SendMode["MANUAL"] = "MANUAL";
    SendMode["AUTO"] = "AUTO";
})(SendMode || (exports.SendMode = SendMode = {}));
class SendZnsMessageDto {
    customer_id;
    template_id;
    phone_number;
    payload;
    sent_by;
    send_mode = SendMode.MANUAL;
}
exports.SendZnsMessageDto = SendZnsMessageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendZnsMessageDto.prototype, "customer_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendZnsMessageDto.prototype, "template_id", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('VN'),
    __metadata("design:type", String)
], SendZnsMessageDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SendZnsMessageDto.prototype, "payload", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendZnsMessageDto.prototype, "sent_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SendMode),
    __metadata("design:type", String)
], SendZnsMessageDto.prototype, "send_mode", void 0);
class ZnsMessageLogDto {
    id;
    customer_id;
    template_id;
    phone_number;
    payload;
    status;
    zalo_msg_id;
    error_code;
    sent_at;
    delivered_at;
    created_at;
}
exports.ZnsMessageLogDto = ZnsMessageLogDto;
//# sourceMappingURL=send-zns-message.dto.js.map