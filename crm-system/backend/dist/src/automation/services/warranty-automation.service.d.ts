import { PrismaService } from '../../prisma/prisma.service';
import { ZaloService } from '../../zns/services/zalo.service';
import { InteractionsService } from '../../interactions/interactions.service';
export declare class WarrantyAutomationService {
    private prisma;
    private zaloService;
    private interactionsService;
    private readonly logger;
    constructor(prisma: PrismaService, zaloService: ZaloService, interactionsService: InteractionsService);
    checkExpiringWarranties(): Promise<void>;
    checkFollowUpReminders(): Promise<void>;
    checkBirthdayReminders(): Promise<void>;
}
