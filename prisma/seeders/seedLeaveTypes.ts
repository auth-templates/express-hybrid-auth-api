import { PrismaClient } from '../../generated/prisma';

export async function seedLeaveTypes(prisma: PrismaClient) {
  // Seed leave_types with skipDuplicates (equivalent to ON CONFLICT DO NOTHING)
  await prisma.leave_types.createMany({
    data: [
      {
        name: 'Annual Leave',
        description: 'Paid leave for vacation or personal use',
      },
      {
        name: 'Sick Leave',
        description: 'Paid leave for medical reasons',
      },
      {
        name: 'Maternity Leave',
        description: 'Paid leave for maternity purposes',
      },
      {
        name: 'Paternity Leave',
        description: 'Paid leave for new fathers',
      },
      {
        name: 'Unpaid Leave',
        description: 'Leave without pay',
      }
    ],
    skipDuplicates: true,  // This will skip records that conflict (duplicate primary keys)
  });
}