"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZnsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zns_service_1 = require("./zns.service");
const zalo_service_1 = require("./services/zalo.service");
const zns_controller_1 = require("./zns.controller");
const zalo_webhook_controller_1 = require("./controllers/zalo-webhook.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let ZnsModule = class ZnsModule {
};
exports.ZnsModule = ZnsModule;
exports.ZnsModule = ZnsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, prisma_module_1.PrismaModule],
        controllers: [zns_controller_1.ZnsController, zalo_webhook_controller_1.ZaloWebhookController],
        providers: [zns_service_1.ZnsService, zalo_service_1.ZaloService],
        exports: [zns_service_1.ZnsService, zalo_service_1.ZaloService],
    })
], ZnsModule);
//# sourceMappingURL=zns.module.js.map