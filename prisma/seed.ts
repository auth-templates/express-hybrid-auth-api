import { PrismaClient } from '../generated/prisma/index.js';
import { seedUsers } from './seeders/seedUsers.ts';
import { seedVerificationTokens } from './seeders/seedVerificationTokens.ts';
const prisma = new PrismaClient();

async function main() {
	await seedUsers(prisma);
	await seedVerificationTokens(prisma);

	console.log('Seeding complete!');
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
