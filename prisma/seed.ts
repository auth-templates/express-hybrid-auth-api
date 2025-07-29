import { PrismaClient } from '../generated/prisma';
import { seedUsers } from './seeders/seedUsers';
import { seedVerificationTokens } from './seeders/seedVerificationTokens';
const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedVerificationTokens(prisma);

  console.log('Seeding complete!');
}

main().catch(e => {
    console.error(e);
}).finally(async () => {
    await prisma.$disconnect();
});
