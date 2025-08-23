import { Prisma } from '../../../generated/prisma/index.js';
import { prismaClient } from '../../lib/prisma-client.js';
import { PrismaErrorCode } from '../../lib/prisma-error-codes.js';
import { TokenType } from '../../models/verification-token.js';
import { VerificationTokensRepository } from '../verification-tokens.js';
import * as tokenLib from '../../lib/token.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('../../lib/token.js');
vi.mock('../../lib/prisma-client.js', () => ({
	prismaClient: {
		verification_tokens: {
			create: vi.fn(),
			findFirst: vi.fn(),
			update: vi.fn(),
		},
	},
}));

describe('VerificationTokensRepository', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('createToken', () => {
		const input = {
			type: TokenType.SignUp,
			userId: 123,
			tokenHash: 'tokenHash',
			tokenFingerprint: 'tokenFingerprint',
			expiresAt: new Date(Date.now() + 3600 * 1000),
		};

		it('should create token successfully', async () => {
			vi.mocked(prismaClient.verification_tokens.create).mockResolvedValue({} as any);

			await expect(VerificationTokensRepository.createToken(input)).resolves.toBeUndefined();

			expect(prismaClient.verification_tokens.create).toHaveBeenCalledWith({
				data: expect.objectContaining({
					user: { connect: { id: input.userId } },
					token_fingerprint: input.tokenFingerprint,
					token_hash: input.tokenHash,
					type: input.type,
					expires_at: input.expiresAt,
				}),
			});
		});

		it('should throw AppError 404 if Prisma record not found error', async () => {
			const prismaError = new Prisma.PrismaClientKnownRequestError('Record not found', {
				code: PrismaErrorCode.RecordNotFound,
				clientVersion: '2.0.0',
				meta: { target: ['userId'] },
			});
			vi.mocked(prismaClient.verification_tokens.create).mockRejectedValue(prismaError);

			await expect(VerificationTokensRepository.createToken(input)).rejects.toMatchObject({
				translationKey: 'errors.user_not_found',
				httpStatusCode: 404,
				code: AppStatusCode.USER_NOT_FOUND,
			});
		});

		it('should throw AppError 500 on other errors', async () => {
			vi.mocked(prismaClient.verification_tokens.create).mockRejectedValue(new Error('Some error'));

			await expect(VerificationTokensRepository.createToken(input)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});

	// Helper function for token verification tests
	function mockTokenFindFirst(tokenType: TokenType, tokenFingerprint: string, tokenRecord: any) {
		vi.mocked(tokenLib.createTokenFingerprint).mockReturnValue(tokenFingerprint);
		vi.mocked(prismaClient.verification_tokens.findFirst).mockResolvedValue(tokenRecord);
		vi.mocked(prismaClient.verification_tokens.update).mockResolvedValue({} as any);
	}

	describe('verifySignupToken', () => {
		const token = 'validSignupToken';
		const fingerprint = 'fingerprint123';
		const now = new Date();

		it('should verify a valid signup token', async () => {
			const tokenRecord = {
				id: 1,
				user_id: 123,
				expires_at: new Date(Date.now() + 10000),
				used_at: null,
			};
			mockTokenFindFirst(TokenType.SignUp, fingerprint, tokenRecord);

			const userId = await VerificationTokensRepository.verifySignupToken(token);
			expect(userId).toEqual({ userId: tokenRecord.user_id });
			expect(prismaClient.verification_tokens.update).toHaveBeenCalledWith({
				where: { id: tokenRecord.id },
				data: expect.objectContaining({ used_at: expect.any(Date) }),
			});
		});

		it('should throw error if token not found', async () => {
			mockTokenFindFirst(TokenType.SignUp, fingerprint, null);

			await expect(VerificationTokensRepository.verifySignupToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.signup.invalid',
				httpStatusCode: 400,
				code: AppStatusCode.SIGNUP_TOKEN_INVALID,
			});
		});

		it('should throw error if token expired', async () => {
			const tokenRecord = {
				id: 1,
				user_id: 123,
				expires_at: new Date(Date.now() - 1000), // expired
				used_at: null,
			};
			mockTokenFindFirst(TokenType.SignUp, fingerprint, tokenRecord);

			await expect(VerificationTokensRepository.verifySignupToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.signup.expired',
				httpStatusCode: 400,
				code: AppStatusCode.SIGNUP_TOKEN_EXPIRED,
			});
		});

		it('should throw error if token already used', async () => {
			const tokenRecord = {
				id: 1,
				user_id: 123,
				expires_at: new Date(Date.now() + 10000),
				used_at: new Date(Date.now() - 1000), // already used
			};
			mockTokenFindFirst(TokenType.SignUp, fingerprint, tokenRecord);

			await expect(VerificationTokensRepository.verifySignupToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.signup.already_used',
				httpStatusCode: 400,
				code: AppStatusCode.SIGNUP_TOKEN_ALREADY_USED,
			});
		});

		it('should throw internal error on unexpected failure', async () => {
			vi.mocked(tokenLib.createTokenFingerprint).mockImplementation(() => {
				throw new Error('Unexpected');
			});

			await expect(VerificationTokensRepository.verifySignupToken(token)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});

	// Similarly for 2FA token
	describe('verify2FAToken', () => {
		const token = 'valid2FAToken';
		const fingerprint = 'fingerprint2fa';

		it('should verify a valid 2FA token', async () => {
			const tokenRecord = {
				id: 2,
				user_id: 456,
				expires_at: new Date(Date.now() + 10000),
				used_at: null,
			};
			mockTokenFindFirst(TokenType.TwoFA, fingerprint, tokenRecord);

			const userId = await VerificationTokensRepository.verify2FAToken(token);
			expect(userId).toEqual({ userId: tokenRecord.user_id });
			expect(prismaClient.verification_tokens.update).toHaveBeenCalledWith({
				where: { id: tokenRecord.id },
				data: expect.objectContaining({ used_at: expect.any(Date) }),
			});
		});

		it('should throw error if token not found', async () => {
			mockTokenFindFirst(TokenType.TwoFA, fingerprint, null);

			await expect(VerificationTokensRepository.verify2FAToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.2fa.invalid',
				httpStatusCode: 400,
				code: AppStatusCode.TWO_FA_RECOVERY_TOKEN_INVALID,
			});
		});

		it('should throw error if token expired', async () => {
			const tokenRecord = {
				id: 2,
				user_id: 456,
				expires_at: new Date(Date.now() - 1000),
				used_at: null,
			};
			mockTokenFindFirst(TokenType.TwoFA, fingerprint, tokenRecord);

			await expect(VerificationTokensRepository.verify2FAToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.2fa.expired',
				httpStatusCode: 400,
				code: AppStatusCode.TWO_FA_RECOVERY_TOKEN_EXPIRED,
			});
		});

		it('should throw error if token used', async () => {
			const tokenRecord = {
				id: 2,
				user_id: 456,
				expires_at: new Date(Date.now() + 10000),
				used_at: new Date(Date.now() - 1000),
			};
			mockTokenFindFirst(TokenType.TwoFA, fingerprint, tokenRecord);

			await expect(VerificationTokensRepository.verify2FAToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.2fa.already_used',
				httpStatusCode: 400,
				code: AppStatusCode.TWO_FA_RECOVERY_TOKEN_ALREADY_USED,
			});
		});

		it('should throw internal error on unexpected failure', async () => {
			vi.mocked(tokenLib.createTokenFingerprint).mockImplementation(() => {
				throw new Error('Unexpected');
			});

			await expect(VerificationTokensRepository.verify2FAToken(token)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});

	// Password reset token tests
	describe('verifyPasswordResetToken', () => {
		const token = 'validResetToken';
		const fingerprint = 'fingerprintReset';

		it('should verify a valid password reset token', async () => {
			const tokenRecord = {
				id: 3,
				user_id: 789,
				expires_at: new Date(Date.now() + 10000),
				used_at: null,
			};
			mockTokenFindFirst(TokenType.PasswordReset, fingerprint, tokenRecord);

			const userId = await VerificationTokensRepository.verifyPasswordResetToken(token);
			expect(userId).toEqual({ userId: tokenRecord.user_id });
			expect(prismaClient.verification_tokens.update).toHaveBeenCalledWith({
				where: { id: tokenRecord.id },
				data: expect.objectContaining({ used_at: expect.any(Date) }),
			});
		});

		it('should throw error if token not found', async () => {
			mockTokenFindFirst(TokenType.PasswordReset, fingerprint, null);

			await expect(VerificationTokensRepository.verifyPasswordResetToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.password-reset.invalid',
				httpStatusCode: 400,
				code: AppStatusCode.PASSWORD_RESET_TOKEN_INVALID,
			});
		});

		it('should throw error if token expired', async () => {
			const tokenRecord = {
				id: 3,
				user_id: 789,
				expires_at: new Date(Date.now() - 1000),
				used_at: null,
			};
			mockTokenFindFirst(TokenType.PasswordReset, fingerprint, tokenRecord);

			await expect(VerificationTokensRepository.verifyPasswordResetToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.password-reset.expired',
				httpStatusCode: 400,
				code: AppStatusCode.PASSWORD_RESET_TOKEN_EXPIRED,
			});
		});

		it('should throw error if token used', async () => {
			const tokenRecord = {
				id: 3,
				user_id: 789,
				expires_at: new Date(Date.now() + 10000),
				used_at: new Date(Date.now() - 1000),
			};
			mockTokenFindFirst(TokenType.PasswordReset, fingerprint, tokenRecord);

			await expect(VerificationTokensRepository.verifyPasswordResetToken(token)).rejects.toMatchObject({
				translationKey: 'tokens.password-reset.already_used',
				httpStatusCode: 400,
				code: AppStatusCode.PASSWORD_RESET_TOKEN_ALREADY_USED,
			});
		});

		it('should throw internal error on unexpected failure', async () => {
			vi.mocked(tokenLib.createTokenFingerprint).mockImplementation(() => {
				throw new Error('Unexpected');
			});

			await expect(VerificationTokensRepository.verifyPasswordResetToken(token)).rejects.toMatchObject({
				translationKey: 'errors.internal',
				httpStatusCode: 500,
				code: AppStatusCode.INTERNAL_SERVER_ERROR,
			});
		});
	});
});
