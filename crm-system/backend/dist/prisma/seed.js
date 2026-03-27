"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    await prisma.customerContact.deleteMany();
    await prisma.customerProduct.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.znsMessageLog.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.user.deleteMany();
    await prisma.znsTemplate.deleteMany();
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@nexus.local',
            full_name: 'Admin',
            password_hash: hashedPassword,
            role: 'ADMIN',
        },
    });
    const cskhUser = await prisma.user.create({
        data: {
            email: 'cskh@nexus.local',
            full_name: 'Nhân viên CSKH',
            password_hash: hashedPassword,
            role: 'CSKH',
        },
    });
    const customers = [];
    for (let i = 1; i <= 20; i++) {
        const customer = await prisma.customer.create({
            data: {
                code: `KH-${String(i).padStart(6, '0')}`,
                full_name: `Khách hàng ${i}`,
                phone_primary: `090${String(i).padStart(7, '0')}`,
                email_primary: `customer${i}@example.com`,
                customer_type: i % 3 === 0 ? 'BUSINESS' : 'PERSONAL',
                segment: i % 5 === 0 ? 'VIP' : i % 3 === 0 ? 'POTENTIAL' : 'NORMAL',
                source: ['Facebook', 'Zalo', 'Direct', 'Website'][i % 4],
                notes: `Sample customer ${i}`,
            },
        });
        customers.push(customer);
        await prisma.customerContact.create({
            data: {
                customer_id: customer.id,
                type: 'PHONE',
                value: `090${String(i).padStart(7, '0')}`,
                is_primary: true,
            },
        });
        const purchase = await prisma.purchase.create({
            data: {
                customer_id: customer.id,
                purchase_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
                source: 'Store',
                notes: `Purchase #${i}`,
            },
        });
        const purchaseDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        const warrantyEndDate = new Date(purchaseDate);
        warrantyEndDate.setMonth(warrantyEndDate.getMonth() + 24);
        await prisma.customerProduct.create({
            data: {
                customer_id: customer.id,
                purchase_id: purchase.id,
                product_model: `Model X${i % 5 + 1}`,
                product_serial: `SN-${String(i).padStart(6, '0')}`,
                purchase_date: purchaseDate,
                warranty_months: 24,
                warranty_end_at: warrantyEndDate,
            },
        });
    }
    const templates = [
        {
            name: 'Nhắc bảo hành sắp hết',
            zalo_template_id: '2847192',
            variables: ['customer_name', 'product_model', 'warranty_end_date', 'days_remaining'],
        },
        {
            name: 'Xác nhận đơn hàng',
            zalo_template_id: '2845501',
            variables: ['customer_name', 'order_id', 'delivery_date'],
        },
        {
            name: 'Lời chúc sinh nhật',
            zalo_template_id: '3456789',
            variables: ['customer_name'],
        },
    ];
    for (const template of templates) {
        await prisma.znsTemplate.create({
            data: {
                name: template.name,
                zalo_template_id: template.zalo_template_id,
                content: `${template.name} template`,
                variables: JSON.stringify(template.variables),
                status: 'ACTIVE',
            },
        });
    }
    console.log('✅ Seeding completed!');
    console.log(`  - ${customers.length} customers created`);
    console.log(`  - ${templates.length} ZNS templates created`);
    console.log('  - 2 users created');
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map