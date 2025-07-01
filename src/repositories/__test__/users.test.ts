import { Prisma } from "../../../generated/prisma";
import { verifyPasswordHash } from "../../lib/password";
import { prismaClient } from "../../lib/prisma-client";
import { Role, UserStatus } from "../../models/user";
import { UserRepository } from "../users";

jest.mock('../../lib/prisma-client', () => ({
    prismaClient: {
        users: {
            create: jest.fn(),
            update: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

jest.mock('../../lib/password', () => ({
    verifyPasswordHash: jest.fn(),
}));

describe('UserRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUser2FASecretById', () => {
        it('should return 2FA secret if user is found and secret exists', async () => {
            const mockSecret = 'SECRET123';
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({ twofa_secret: mockSecret });

            const result = await UserRepository.getUser2FASecretById(42);

            expect(prismaClient.users.findUnique).toHaveBeenCalledWith({
                where: { id: 42 },
                select: { twofa_secret: true },
            });

            expect(result).toBe(mockSecret);
        });

        it('should throw 404 AppError if user not found', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(UserRepository.getUser2FASecretById(42)).rejects.toMatchObject({
                translationKey: 'errors.user_2fa_secret_not_found',
                statusCode: 404,
            });
        });

        it('should throw 404 AppError if twofa_secret is missing', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({ twofa_secret: null });

            await expect(UserRepository.getUser2FASecretById(42)).rejects.toMatchObject({
                translationKey: 'errors.user_2fa_secret_not_found',
                statusCode: 404,
            });
        });

        it('should throw internal AppError on unknown error', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockRejectedValue(new Error('DB exploded'));

            await expect(UserRepository.getUser2FASecretById(42)).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('UserRepository.acceptTerms', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should update terms_accepted field for the user', async () => {
            (prismaClient.users.update as jest.Mock).mockResolvedValue({});

            await UserRepository.acceptTerms(42, true);

            expect(prismaClient.users.update).toHaveBeenCalledWith({
            where: { id: 42 },
            data: { terms_accepted: true },
            });
        });

        it('should throw AppError on failure', async () => {
            (prismaClient.users.update as jest.Mock).mockRejectedValue(new Error('DB error'));

            await expect(UserRepository.acceptTerms(42, true)).rejects.toMatchObject({
            translationKey: 'errors.internal',
            statusCode: 500,
            });
        });
    });

    describe('createUser', () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            passwordHash: 'hashedpassword',
            role: Role.Employee,
        };

        it('should create user and return user id', async () => {
            (prismaClient.users.create as jest.Mock).mockResolvedValue({ id: 1 });

            const id = await UserRepository.createUser(userData);

            expect(prismaClient.users.create).toHaveBeenCalledWith({
                data: {
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    email: userData.email,
                    password_hash: userData.passwordHash,
                    role: userData.role,
                },
            });
            expect(id).toBe(1);
        });

        it('should throw AppError with 409 on unique constraint failure', async () => {
            const prismaError = new Prisma.PrismaClientKnownRequestError(
                'Unique constraint failed',
                {
                    code: 'P2002',
                    clientVersion: '2.0.0',
                    meta: { target: ['email'] },
                }
            );

            (prismaClient.users.create as jest.Mock).mockRejectedValue(prismaError);

            await expect(UserRepository.createUser(userData)).rejects.toMatchObject({
                translationKey: 'errors.is_already_in_use',
                statusCode: 409,
            });
        });

        it('should throw AppError with 500 on other errors', async () => {
            (prismaClient.users.create as jest.Mock).mockRejectedValue(new Error('Unknown error'));

            await expect(UserRepository.createUser(userData)).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('updatePassword', () => {
        it('should call prisma update', async () => {
            (prismaClient.users.update as jest.Mock).mockResolvedValue({});
            await UserRepository.updatePassword(1, 'newhash');
            expect(prismaClient.users.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { password_hash: 'newhash' },
            });
        });

        it('should throw AppError on error', async () => {
            (prismaClient.users.update as jest.Mock).mockRejectedValue(new Error('fail'));
            await expect(UserRepository.updatePassword(1, 'newhash')).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('updateUserStatus', () => {
        it('should update status with current date', async () => {
            (prismaClient.users.update as jest.Mock).mockResolvedValue({});
            const before = new Date();
            await UserRepository.updateUserStatus(1, UserStatus.Active);
            const after = new Date();

            expect(prismaClient.users.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: expect.objectContaining({
                    status: UserStatus.Active,
                    status_changed_at: expect.any(Date),
                }),
            });

            const calledDate = (prismaClient.users.update as jest.Mock).mock.calls[0][0].data.status_changed_at;
            expect(calledDate.getTime()).toBeGreaterThanOrEqual(before.getTime());
            expect(calledDate.getTime()).toBeLessThanOrEqual(after.getTime());
        });

        it('should throw AppError on error', async () => {
            (prismaClient.users.update as jest.Mock).mockRejectedValue(new Error('fail'));
            await expect(UserRepository.updateUserStatus(1, UserStatus.Active)).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('login', () => {
        const userRecord = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            password_hash: 'hash',
            role: 'User',
            created_at: new Date('2023-01-01'),
            twofa_enabled: false,
        };

        it('should return user object on valid credentials', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(userRecord);
            (verifyPasswordHash as jest.Mock).mockResolvedValue(true);

            const user = await UserRepository.login('john@example.com', 'password');

            expect(prismaClient.users.findUnique).toHaveBeenCalledWith({
                where: { email: 'john@example.com' },
                select: expect.any(Object),
            });

            expect(verifyPasswordHash).toHaveBeenCalledWith(userRecord.password_hash, 'password');
            expect(user).toMatchObject({
                id: userRecord.id,
                firstName: userRecord.first_name,
                lastName: userRecord.last_name,
                email: userRecord.email,
                role: userRecord.role,
                createdAt: userRecord.created_at,
                enabled2FA: userRecord.twofa_enabled,
            });
        });

        it('should throw invalid_credentials if user not found', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(UserRepository.login('john@example.com', 'password')).rejects.toMatchObject({
                translationKey: 'errors.invalid_credentials',
                statusCode: 400,
            });
        });

        it('should throw social_login_required if password_hash is __OAUTH__', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue({
                ...userRecord,
                password_hash: '__OAUTH__',
            });

            await expect(UserRepository.login('john@example.com', 'password')).rejects.toMatchObject({
                translationKey: 'errors.social_login_required',
                statusCode: 401,
            });
        });

        it('should throw invalid_credentials if password does not match', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(userRecord);
            (verifyPasswordHash as jest.Mock).mockResolvedValue(false);

            await expect(UserRepository.login('john@example.com', 'wrongpassword')).rejects.toMatchObject({
                translationKey: 'errors.invalid_credentials',
                statusCode: 400,
            });
        });

        it('should throw internal error on unexpected error', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockRejectedValue(new Error('fail'));

            await expect(UserRepository.login('john@example.com', 'password')).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('getUserById', () => {
        const userRecord = {
            id: 1,
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@example.com',
            password_hash: 'hash',
            role: 'User',
            created_at: new Date('2023-01-02'),
            twofa_enabled: false,
        };

        it('should return user if found', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(userRecord);

            const user = await UserRepository.getUserById(1);

            expect(user).toMatchObject({
                id: userRecord.id,
                firstName: userRecord.first_name,
                lastName: userRecord.last_name,
                email: userRecord.email,
                role: userRecord.role,
                createdAt: userRecord.created_at,
                enabled2FA: userRecord.twofa_enabled,
            });
        });

        it('should throw user_not_found if no user', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(UserRepository.getUserById(1)).rejects.toMatchObject({
                translationKey: 'errors.user_not_found',
                statusCode: 404,
            });
        });

        it('should throw internal error on unexpected error', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockRejectedValue(new Error('fail'));

            await expect(UserRepository.getUserById(1)).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('getUserByEmail', () => {
        const userRecord = {
            id: 1,
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@example.com',
            password_hash: 'hash',
            role: 'User',
            created_at: new Date('2023-01-02'),
            twofa_enabled: false,
        };

        it('should return user if found', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(userRecord);

            const user = await UserRepository.getUserByEmail('jane@example.com');

            expect(user).toMatchObject({
                id: userRecord.id,
                firstName: userRecord.first_name,
                lastName: userRecord.last_name,
                email: userRecord.email,
                role: userRecord.role,
                createdAt: userRecord.created_at,
                enabled2FA: userRecord.twofa_enabled,
            });
        });

        it('should throw user_email_not_found if no user', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(UserRepository.getUserByEmail('jane@example.com')).rejects.toMatchObject({
                translationKey: 'errors.user_email_not_found',
                statusCode: 404,
            });
        });

        it('should throw internal error on unexpected error', async () => {
            (prismaClient.users.findUnique as jest.Mock).mockRejectedValue(new Error('fail'));

            await expect(UserRepository.getUserByEmail('jane@example.com')).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('verifyAndSaveSecret', () => {
        it('should update twofa_secret and enable 2FA', async () => {
            (prismaClient.users.update as jest.Mock).mockResolvedValue({});

            await UserRepository.verifyAndSaveSecret(1, 'secret');

            expect(prismaClient.users.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { twofa_secret: 'secret', twofa_enabled: true },
            });
        });

        it('should throw internal error on failure', async () => {
            (prismaClient.users.update as jest.Mock).mockRejectedValue(new Error('fail'));

            await expect(UserRepository.verifyAndSaveSecret(1, 'secret')).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });

    describe('disable2FA', () => {
        it('should set twofa_secret to null', async () => {
            (prismaClient.users.update as jest.Mock).mockResolvedValue({});

            await UserRepository.disable2FA(1);

            expect(prismaClient.users.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: { twofa_secret: null },
            });
        });

        it('should throw internal error on failure', async () => {
            (prismaClient.users.update as jest.Mock).mockRejectedValue(new Error('fail'));

            await expect(UserRepository.disable2FA(1)).rejects.toMatchObject({
                translationKey: 'errors.internal',
                statusCode: 500,
            });
        });
    });
});
