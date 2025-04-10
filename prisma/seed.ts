import { PrismaClient } from '../generated/prisma';
import { seedUsers } from './seeders/seedUsers';
import { seedLeaveTypes } from './seeders/seedLeaveTypes';
import { seedLeaveBalances } from './seeders/seedLeaveBalances';
import { seedLeaveRequests } from './seeders/seedLeaveRequests';

const prisma = new PrismaClient();

async function main() {
//   console.log("Dropping all tables...");
//   // Reset the database
//   await prisma.$executeRaw`DROP SCHEMA public CASCADE;`;
//   await prisma.$executeRaw`CREATE SCHEMA public;`;

  console.log("Database reset complete. Seeding new data...");
    
  await seedUsers(prisma);
  await seedLeaveTypes(prisma);
  await seedLeaveBalances(prisma);
  await seedLeaveRequests(prisma);

  console.log('Seeding complete!');
}

main().catch(e => {
    console.error(e);
}).finally(async () => {
    await prisma.$disconnect();
});
