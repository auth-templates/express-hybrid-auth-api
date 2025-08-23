import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function resetDatabase() {
	try {
		console.log('Dropping all tables...');

		// Dropping all tables via raw SQL (this will depend on your DB and how Prisma manages migrations)
		await prisma.$executeRaw`DROP SCHEMA public CASCADE;`;
		await prisma.$executeRaw`CREATE SCHEMA public;`;

		console.log('Database reset complete.');
	} catch (error) {
		console.error('Error resetting the database:', error);
	} finally {
		await prisma.$disconnect();
	}
}

resetDatabase();
