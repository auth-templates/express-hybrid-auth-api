import { PrismaClient } from '../../generated/prisma';

export async function seedUsers(prisma: PrismaClient) {
    await prisma.users.createMany({
        data: [
            {
                first_name: 'Dev',
                last_name: 'User',
                email: 'dev@mail.com',
                password_hash: '$argon2id$v=19$m=19456,t=2,p=1$lfggMWVNc/sOmayyBm0G3g$ZhlH2V1j6j24exoUZCW7lO2Vso6lIakT+DN3VZd1TbI',
                role: 'admin',
                status: 'active',
                created_at: new Date('2023-10-04 02:42:19'),
                status_changed_at: new Date('2023-10-05 02:42:19'),
                terms_accepted: true
            },
            {
                first_name: 'Zachary',
                last_name: 'Lopez',
                email: 'michael41@walker.info',
                password_hash: '1FTbyFaG(smq',
                role: 'manager',
                created_at: new Date('2022-02-27 05:33:21'),
                terms_accepted: true
            },
            {
                first_name: 'Anthony',
                last_name: 'Vasquez',
                email: 'dawnrichardson@hotmail.com',
                password_hash: 'ybA11dCu)6@u',
                role: 'admin',
                status: 'active',
                created_at: new Date('2023-06-19 12:52:13'),
                status_changed_at: new Date('2023-06-19 18:52:13'),
                terms_accepted: true
            },
            {
                first_name: 'Johnathan',
                last_name: 'Kim',
                email: 'jesse79@gross-good.info',
                password_hash: '49TNlk!T^eT2',
                role: 'employee',
                created_at: new Date('2024-04-03 02:36:10'),
                terms_accepted: true
            },
            {
                first_name: 'Dawn',
                last_name: 'Figueroa',
                email: 'brianwilliams@hotmail.com',
                password_hash: '^kz76PNyhIFW',
                role: 'manager',
                status: 'active',
                created_at: new Date('2022-08-16 18:00:17'),
                status_changed_at: new Date('2022-08-16 19:00:17'),
                terms_accepted: true
            },
            {
                first_name: 'Donald',
                last_name: 'Banks',
                email: 'maryparker@gmail.com',
                password_hash: 'I(6K4UQabT_Y',
                role: 'employee',
                status: 'active',
                created_at: new Date('2022-06-28 15:51:43'),
                status_changed_at: new Date('2022-06-28 16:00:43'),
                terms_accepted: true
            },
            {
                first_name: 'Joseph',
                last_name: 'Shepherd',
                email: 'gentrykristin@yahoo.com',
                password_hash: 'n2X0N5mh&p_m',
                role: 'employee',
                status: 'active',
                created_at: new Date('2024-09-20 09:34:04'),
                status_changed_at: new Date('2024-09-21 09:34:04'),
                terms_accepted: true
            },
            {
                first_name: 'Ryan',
                last_name: 'Sharp',
                email: 'boneal@henderson.com',
                password_hash: '*GrBL$pe46OL',
                role: 'employee',
                status: 'suspended',
                created_at: new Date('2020-02-26 03:56:33'),
                status_changed_at: new Date('2020-05-30 03:00:33'),
                terms_accepted: true
            },
            {
                first_name: 'Lisa',
                last_name: 'Wise',
                email: 'dianejimenez@yahoo.com',
                password_hash: 'F4ROmms!!juK',
                role: 'admin',
                status: 'active',
                created_at: new Date('2023-10-14 17:04:36'),
                status_changed_at: new Date('2023-10-15 17:04:36'),
                terms_accepted: true
            },
            {
                first_name: 'Amy',
                last_name: 'Gonzalez',
                email: 'nicholsreginald@hampton.com',
                password_hash: '$0FoGwHoq2Ri',
                role: 'admin',
                status: 'active',
                created_at: new Date('2020-06-17 10:14:17'),
                status_changed_at: new Date('2020-06-17 10:34:17'),
                terms_accepted: true
            }
        ],
    });
}