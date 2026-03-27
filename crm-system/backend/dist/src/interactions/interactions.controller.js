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
exports.InteractionsController = void 0;
const common_1 = require("@nestjs/common");
const interactions_service_1 = require("./interactions.service");
const dtos_1 = require("./dtos");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let InteractionsController = class InteractionsController {
    interactionsService;
    constructor(interactionsService) {
        this.interactionsService = interactionsService;
    }
    createInteraction(dto) {
        return this.interactionsService.createInteraction(dto);
    }
    getHistory(customerId) {
        return this.interactionsService.getInteractionHistory(customerId);
    }
    createReminder(dto) {
        return this.interactionsService.createReminder(dto);
    }
    getReminders(customerId) {
        return this.interactionsService.getReminders(customerId);
    }
    getPendingReminders() {
        return this.interactionsService.getPendingReminders();
    }
    updateReminder(id, dto) {
        return this.interactionsService.updateReminder(id, dto);
    }
};
exports.InteractionsController = InteractionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateInteractionDto]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "createInteraction", null);
__decorate([
    (0, common_1.Get)('customer/:customerId'),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)('reminders'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateReminderDto]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "createReminder", null);
__decorate([
    (0, common_1.Get)('reminders/customer/:customerId'),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "getReminders", null);
__decorate([
    (0, common_1.Get)('reminders/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "getPendingReminders", null);
__decorate([
    (0, common_1.Patch)('reminders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateReminderDto]),
    __metadata("design:returntype", void 0)
], InteractionsController.prototype, "updateReminder", null);
exports.InteractionsController = InteractionsController = __decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('interactions'),
    __metadata("design:paramtypes", [interactions_service_1.InteractionsService])
], InteractionsController);
//# sourceMappingURL=interactions.controller.js.map