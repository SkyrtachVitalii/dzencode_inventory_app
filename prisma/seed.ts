import { PrismaClient } from '@prisma/client';
import { ordersData } from '../src/data/orders';


const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  try {
    await prisma.price.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.order.deleteMany({});
    console.log('🧹 Database cleared.');

    for (const orderMock of ordersData) {
      const createdOrder = await prisma.order.create({
        data: {
          title: orderMock.title,
          date: new Date(orderMock.date),
          description: orderMock.description,
          products: {
            create: orderMock.products.map((prod) => ({
              serialNumber: String(prod.serialNumber),
              isNew: Boolean(prod.isNew),
              photo: prod.photo,
              title: prod.title,
              type: prod.type,
              specification: prod.specification,
              guaranteeStart: new Date(prod.guaranteeStart),
              guaranteeEnd: new Date(prod.guaranteeEnd),
              prices: {
                create: prod.prices.map((p) => ({
                  value: p.value,
                  symbol: p.symbol,
                  isDefault: Boolean(p.isDefault),
                })),
              },
            })),
          },
        },
      });
      console.log(`✅ Created order: ${createdOrder.id}`);
    }
    console.log('🏁 Seeding finished successfully.');
  } catch (e) {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();