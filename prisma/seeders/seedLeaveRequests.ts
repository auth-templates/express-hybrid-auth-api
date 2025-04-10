import { PrismaClient } from '../../generated/prisma';

export async function seedLeaveRequests(prisma: PrismaClient) {
  await prisma.leave_requests.createMany({
    data: [
      { id: 1, user_id: 2, leave_type_id: 3, start_date: new Date('2024-04-07'), end_date: new Date('2025-06-01'), status: 'pending', reason: 'With light film always space personal.', created_at: new Date('2022-11-13 02:04:45') },
      { id: 2, user_id: 10, leave_type_id: 4, start_date: new Date('2024-06-28'), end_date: new Date('2025-04-08'), status: 'rejected', reason: 'Though wish administration one result senior prove.', created_at: new Date('2021-11-15 09:08:48') },
      { id: 3, user_id: 5, leave_type_id: 5, start_date: new Date('2025-02-17'), end_date: new Date('2025-04-28'), status: 'pending', reason: 'Type security story involve after green.', created_at: new Date('2023-11-17 07:43:53') },
      { id: 4, user_id: 8, leave_type_id: 4, start_date: new Date('2024-12-05'), end_date: new Date('2025-09-23'), status: 'pending', reason: 'Kid artist economy reach lead.', created_at: new Date('2024-06-08 06:24:16') },
      { id: 5, user_id: 8, leave_type_id: 3, start_date: new Date('2025-02-10'), end_date: new Date('2026-01-28'), status: 'pending', reason: 'Wrong outside task few.', created_at: new Date('2023-01-09 13:17:47') },
      { id: 6, user_id: 8, leave_type_id: 2, start_date: new Date('2024-11-04'), end_date: new Date('2026-01-24'), status: 'pending', reason: 'School remain star head.', created_at: new Date('2020-10-08 09:53:40') },
      { id: 7, user_id: 4, leave_type_id: 5, start_date: new Date('2024-04-01'), end_date: new Date('2026-02-11'), status: 'rejected', reason: 'Floor difference none rock Congress.', created_at: new Date('2022-10-18 18:39:08') },
      { id: 8, user_id: 9, leave_type_id: 4, start_date: new Date('2024-06-30'), end_date: new Date('2025-12-18'), status: 'pending', reason: 'Actually science authority base college range life strategy.', created_at: new Date('2024-05-22 02:27:44') },
      { id: 9, user_id: 9, leave_type_id: 3, start_date: new Date('2024-12-23'), end_date: new Date('2026-02-26'), status: 'pending', reason: 'Last class along design.', created_at: new Date('2021-09-23 09:29:42') },
      { id: 10, user_id: 6, leave_type_id: 4, start_date: new Date('2024-10-31'), end_date: new Date('2025-04-03'), status: 'approved', reason: 'When choice feel husband.', created_at: new Date('2024-01-31 11:54:08') }
    ],
  });
}