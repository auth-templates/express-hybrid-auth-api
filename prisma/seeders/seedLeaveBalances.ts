import { PrismaClient } from '../../generated/prisma';

export async function seedLeaveBalances(prisma: PrismaClient) {
  await prisma.leave_balances.createMany({
    data: [
      { id: 1, user_id: 2, leave_type_id: 5, balance: 14, updated_at: new Date('2021-08-03 18:01:39') },
      { id: 2, user_id: 3, leave_type_id: 2, balance: 29, updated_at: new Date('2021-06-16 11:03:53') },
      { id: 3, user_id: 10, leave_type_id: 2, balance: 7, updated_at: new Date('2023-07-22 08:22:43') },
      { id: 4, user_id: 4, leave_type_id: 1, balance: 4, updated_at: new Date('2021-05-09 22:01:44') },
      { id: 5, user_id: 9, leave_type_id: 2, balance: 7, updated_at: new Date('2023-07-19 17:19:38') },
      { id: 6, user_id: 4, leave_type_id: 4, balance: 10, updated_at: new Date('2024-05-18 21:42:17') },
      { id: 7, user_id: 8, leave_type_id: 1, balance: 7, updated_at: new Date('2022-05-29 22:40:47') },
      { id: 8, user_id: 2, leave_type_id: 1, balance: 20, updated_at: new Date('2022-10-14 18:25:38') },
      { id: 9, user_id: 8, leave_type_id: 3, balance: 27, updated_at: new Date('2021-09-26 02:36:39') },
      { id: 10, user_id: 9, leave_type_id: 5, balance: 9, updated_at: new Date('2021-01-06 11:07:36') }
    ],
  });
}