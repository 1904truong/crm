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
exports.WarrantiesController = void 0;
const common_1 = require("@nestjs/common");
const warranties_service_1 = require("./warranties.service");
const dtos_1 = require("./dtos");
let WarrantiesController = class WarrantiesController {
    warrantiesService;
    constructor(warrantiesService) {
        this.warrantiesService = warrantiesService;
    }
    createCase(dto) {
        return this.warrantiesService.createWarrantyCase(dto);
    }
    getCasesByCustomer(customerId) {
        return this.warrantiesService.getWarrantyCases(customerId);
    }
    getExpiringWarranties(days = 30) {
        return this.warrantiesService.getExpiringWarranties(days);
    }
    getCaseById(id) {
        return this.warrantiesService.getWarrantyCaseById(id);
    }
    updateCase(id, dto) {
        return this.warrantiesService.updateWarrantyCase(id, dto);
    }
};
exports.WarrantiesController = WarrantiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateWarrantyCaseDto]),
    __metadata("design:returntype", void 0)
], WarrantiesController.prototype, "createCase", null);
__decorate([
    (0, common_1.Get)('customer/:customerId'),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarrantiesController.prototype, "getCasesByCustomer", null);
__decorate([
    (0, common_1.Get)('expiring'),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WarrantiesController.prototype, "getExpiringWarranties", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarrantiesController.prototype, "getCaseById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateWarrantyCaseDto]),
    __metadata("design:returntype", void 0)
], WarrantiesController.prototype, "updateCase", null);
exports.WarrantiesController = WarrantiesController = __decorate([
    (0, common_1.Controller)('warranties'),
    __metadata("design:paramtypes", [warranties_service_1.WarrantiesService])
], WarrantiesController);
//# sourceMappingURL=warranties.controller.js.map