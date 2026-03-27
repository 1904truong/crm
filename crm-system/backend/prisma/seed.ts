import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.customerContact.deleteMany();
  await prisma.customerProduct.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.znsMessageLog.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.znsTemplate.deleteMany();

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@nexus.local',
      full_name: 'Admin',
      password_hash: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create CSKH User
  const cskhUser = await prisma.user.create({
    data: {
      email: 'cskh@nexus.local',
      full_name: 'Nhân viên CSKH',
      password_hash: hashedPassword,
      role: 'CSKH',
    },
  });

  // Create sample customers
  const customers: any[] = [];
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

    // Add phone contact
    await prisma.customerContact.create({
      data: {
        customer_id: customer.id,
        type: 'PHONE',
        value: `090${String(i).padStart(7, '0')}`,
        is_primary: true,
      },
    });

    // Create purchase
    const purchase = await prisma.purchase.create({
      data: {
        customer_id: customer.id,
        purchase_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        source: 'Store',
        notes: `Purchase #${i}`,
      },
    });

    // Create product with warranty
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

  // Create ZNS Templates
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


