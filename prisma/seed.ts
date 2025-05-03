import { PrismaClient } from '../generated/prisma';
import { seedUsers } from './seeders/seedUsers';
import { seedLeaveTypes } from './seeders/seedLeaveTypes';
import { seedLeaveBalances } from './seeders/seedLeaveBalances';
import { seedLeaveRequests } from './seeders/seedLeaveRequests';
import { seedVerificationTokens } from './seeders/seedVerificationTokens';
const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedLeaveTypes(prisma);
  await seedLeaveBalances(prisma);
  await seedLeaveRequests(prisma);
  await seedVerificationTokens(prisma);

  console.log('Seeding complete!');
}

main().catch(e => {
    console.error(e);
}).finally(async () => {
    await prisma.$disconnect();
});
