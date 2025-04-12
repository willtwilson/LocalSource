import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // Seed Vendor Types
  const vendorTypes = [
    { name: 'Farm Produce' },
    { name: 'Bakery' },
    { name: 'Crafts' },
    { name: 'Honesty Box' },
    { name: 'Food Stall' },
    { name: 'Other' },
  ];

  for (const vt of vendorTypes) {
    const vendorType = await prisma.vendorType.create({
      data: vt,
    });
    console.log(`Created vendor type with id: ${vendorType.id}`)
  }

  // Optional: Seed a sample User
  // Optional: Seed a sample Vendor

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 