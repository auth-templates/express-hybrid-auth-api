import { AppStatusCode } from '@/@types/status-code.js';
import { Prisma } from '../../../generated/prisma/index.js';
import { verifyPasswordHash } from '../../lib/password.js';
import { prismaClient } from '../../lib/prisma-client.js';
import { Role, UserStatus } from '../../models/user.js';
import { UserRepository } from '../users.js';

vi.mock('../../lib/prisma-client.js', () => ({
	prismaClient: {
		users: {
			create: vi.fn(),
			update: vi.fn(),
			findUnique: vi.fn(),
		},
	},
}));

vi.mock('../../lib/password.js', () => ({
	verifyPasswordHash: vi.fn(),
}));

describe('UserRepository', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getUser2FASecretById', () => {
		it('should return 2FA secret if user is found and secret exists', async () => {
			const mockSecret = 'SECRET123';
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue({ twofa_secret: mockSecret } as any);

			const result = await UserRepository.getUser2FASecretById(42);

			expect(prismaClient.users.findUnique).toHaveBeenCalledWith({
				where: { id: 42 },
				select: { twofa_secret: true },
			});

			expect(result).toBe(mockSecret);
		});

		it('should throw 403 AppError if user not found', async () => {
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(null);

			await expect(UserRepository.getUser2FASecretById(42)).rejects.toMatchObject({
				translationKey: 'errors.2fa_not_configured',
				httpStatusCode: 403,
				code: AppStatusCode.TWO_FA_NOT_CONFIGURED,
			});
		});

		it('should throw 403 AppError if twofa_secret is missing', async () => {
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue({ twofa_secret: null } as any);

			await expect(UserRepository.getUser2FASecretById(42)).rejects.toMatchObject({
				translationKey: 'errors.2fa_not_configured',
				httpStatusCode: 403,
				code: AppStatusCode.TWO_FA_NOT_CONFIGURED,
			});
		});

		it('should throw internal AppError on unknown error', async () => {
			vi.mocked(prismaClient.users.findUnique).mockRejectedValue(new Error('DB exploded'));

			await expect(UserRepository.getUser2FASecretById(42)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});

	describe('UserRepository.acceptTerms', () => {
		beforeEach(() => {
			vi.clearAllMocks();
		});

		it('should update terms_accepted field for the user', async () => {
			vi.mocked(prismaClient.users.update).mockResolvedValue({} as any);

			await UserRepository.acceptTerms(42, true);

			expect(prismaClient.users.update).toHaveBeenCalledWith({
				where: { id: 42 },
				data: { terms_accepted: true },
			});
		});

		it('should throw AppError on failure', async () => {
			vi.mocked(prismaClient.users.update).mockRejectedValue(new Error('DB error'));

			await expect(UserRepository.acceptTerms(42, true)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
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
			vi.mocked(prismaClient.users.create).mockResolvedValue({ id: 1 } as any);

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

		it('should throw AppError with 500 on other errors', async () => {
			vi.mocked(prismaClient.users.create).mockRejectedValue(new Error('Unknown error'));

			await expect(UserRepository.createUser(userData)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});

		it('should throw AppError with 409 on unique constraint failure', async () => {
			const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
				code: 'P2002',
				clientVersion: '2.0.0',
				meta: { target: ['email'] },
			});

			vi.mocked(prismaClient.users.create).mockRejectedValue(prismaError);

			await expect(UserRepository.createUser(userData)).rejects.toMatchObject({
				translationKey: 'errors.email_address_already_in_use',
				httpStatusCode: 409,
				code: AppStatusCode.EMAIL_ALREADY_IN_USE,
			});
		});
	});

	describe('updatePassword', () => {
		it('should call prisma update', async () => {
			vi.mocked(prismaClient.users.update).mockResolvedValue({} as any);
			await UserRepository.updatePassword(1, 'newhash');
			expect(prismaClient.users.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { password_hash: 'newhash' },
			});
		});

		it('should throw AppError on error', async () => {
			vi.mocked(prismaClient.users.update).mockRejectedValue(new Error('fail'));
			await expect(UserRepository.updatePassword(1, 'newhash')).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});

	describe('updateUserStatus', () => {
		it('should update status with current date', async () => {
			vi.mocked(prismaClient.users.update).mockResolvedValue({} as any);
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

			const calledDate = vi.mocked(prismaClient.users.update).mock.calls[0][0].data.status_changed_at;
			expect((calledDate as Date).getTime()).toBeGreaterThanOrEqual(before.getTime());
			expect((calledDate as Date).getTime()).toBeLessThanOrEqual(after.getTime());
		});

		it('should throw AppError on error', async () => {
			vi.mocked(prismaClient.users.update).mockRejectedValue(new Error('fail'));
			await expect(UserRepository.updateUserStatus(1, UserStatus.Active)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
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
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(userRecord as any);
			vi.mocked(verifyPasswordHash).mockResolvedValue(true);

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
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(null);

			await expect(UserRepository.login('john@example.com', 'password')).rejects.toMatchObject({
				translationKey: 'errors.invalid_credentials',
				httpStatusCode: 400,
				code: AppStatusCode.INVALID_CREDENTIALS,
			});
		});

		it('should throw social_login_required if password_hash is __OAUTH__', async () => {
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue({
				...userRecord,
				password_hash: '__OAUTH__',
			} as any);

			await expect(UserRepository.login('john@example.com', 'password')).rejects.toMatchObject({
				translationKey: 'errors.social_login_required',
				httpStatusCode: 401,
				code: AppStatusCode.SOCIAL_LOGIN_REQUIRED,
			});
		});

		it('should throw invalid_credentials if password does not match', async () => {
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(userRecord as any);
			vi.mocked(verifyPasswordHash).mockResolvedValue(false);

			await expect(UserRepository.login('john@example.com', 'wrongpassword')).rejects.toMatchObject({
				translationKey: 'errors.invalid_credentials',
				httpStatusCode: 400,
				code: AppStatusCode.INVALID_CREDENTIALS,
			});
		});

		it('should throw internal error on unexpected error', async () => {
			vi.mocked(prismaClient.users.findUnique).mockRejectedValue(new Error('fail'));

			await expect(UserRepository.login('john@example.com', 'password')).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
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
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(userRecord as any);

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
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(null);

			await expect(UserRepository.getUserById(1)).rejects.toMatchObject({
				translationKey: 'errors.user_not_found',
				httpStatusCode: 404,
				code: AppStatusCode.USER_NOT_FOUND,
			});
		});

		it('should throw internal error on unexpected error', async () => {
			vi.mocked(prismaClient.users.findUnique).mockRejectedValue(new Error('fail'));

			await expect(UserRepository.getUserById(1)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
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
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(userRecord as any);

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
			vi.mocked(prismaClient.users.findUnique).mockResolvedValue(null);

			await expect(UserRepository.getUserByEmail('jane@example.com')).rejects.toMatchObject({
				translationKey: 'errors.user_email_not_found',
				httpStatusCode: 404,
				code: AppStatusCode.USER_NOT_FOUND,
			});
		});

		it('should throw internal error on unexpected error', async () => {
			vi.mocked(prismaClient.users.findUnique).mockRejectedValue(new Error('fail'));

			await expect(UserRepository.getUserByEmail('jane@example.com')).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});

	describe('verifyAndSaveSecret', () => {
		it('should update twofa_secret and enable 2FA', async () => {
			vi.mocked(prismaClient.users.update).mockResolvedValue({} as any);

			await UserRepository.verifyAndSaveSecret(1, 'secret');

			expect(prismaClient.users.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { twofa_secret: 'secret', twofa_enabled: true },
			});
		});

		it('should throw internal error on failure', async () => {
			vi.mocked(prismaClient.users.update).mockRejectedValue(new Error('fail'));

			await expect(UserRepository.verifyAndSaveSecret(1, 'secret')).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});

	describe('disable2FA', () => {
		it('should set twofa_secret to null', async () => {
			vi.mocked(prismaClient.users.update).mockResolvedValue({} as any);

			await UserRepository.disable2FA(1);

			expect(prismaClient.users.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { twofa_secret: null },
			});
		});

		it('should throw internal error on failure', async () => {
			vi.mocked(prismaClient.users.update).mockRejectedValue(new Error('fail'));

			await expect(UserRepository.disable2FA(1)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});
});
