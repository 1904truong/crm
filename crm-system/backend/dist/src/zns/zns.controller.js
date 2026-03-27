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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZnsController = void 0;
const common_1 = require("@nestjs/common");
const zns_service_1 = require("./zns.service");
const dtos_1 = require("./dtos");
let ZnsController = class ZnsController {
    znsService;
    constructor(znsService) {
        this.znsService = znsService;
    }
    createTemplate(dto) {
        return this.znsService.createTemplate(dto);
    }
    getTemplates() {
        return this.znsService.getTemplates();
    }
    send(dto) {
        return this.znsService.sendZnsMessage(dto);
    }
    getLogs(customerId) {
        return this.znsService.getZnsLogs(customerId);
    }
    getQueuedMessages() {
        return this.znsService.getQueuedMessages();
    }
    updateStatus(id, body) {
        return this.znsService.updateZnsStatus(id, body.status, body.zalo_msg_id);
    }
};
exports.ZnsController = ZnsController;
__decorate([
    (0, common_1.Post)('templates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateZnsTemplateDto]),
    __metadata("design:returntype", void 0)
], ZnsController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZnsController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.SendZnsMessageDto]),
    __metadata("design:returntype", void 0)
], ZnsController.prototype, "send", null);
__decorate([
    (0, common_1.Get)('logs/customer/:customerId'),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZnsController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('queued'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZnsController.prototype, "getQueuedMessages", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ZnsController.prototype, "updateStatus", null);
exports.ZnsController = ZnsController = __decorate([
    (0, common_1.Controller)('zns'),
    __metadata("design:paramtypes", [zns_service_1.ZnsService])
], ZnsController);
//# sourceMappingURL=zns.controller.js.map