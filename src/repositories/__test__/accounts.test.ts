import { AppStatusCode } from "@/@types/status-code";
import { AppError } from "../../lib/error";
import { prismaClient } from "../../lib/prisma-client";
import { AccountsRepository, createAccountInput } from "../accounts";

jest.mock('../../lib/prisma-client', () => ({
  prismaClient: {
    accounts: {
      upsert: jest.fn(),
    },
  },
}));

describe('AccountsRepository', () => {
  const input: createAccountInput = {
    id: 'provider-user-123',
    provider: 'google',
    email: 'user@example.com',
    avatar_url: 'http://avatar.url/image.png',
    firstName: 'John',
    lastName: 'Doe',
  };

  const prismaResponse = {
    user: {
      id: 'user-id-456',
      first_name: 'John',
      last_name: 'Doe',
      email: 'user@example.com',
      role: 'User',
      created_at: new Date('2023-01-01T00:00:00Z'),
      twofa_enabled: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user data on successful upsert', async () => {
    (prismaClient.accounts.upsert as jest.Mock).mockResolvedValue(prismaResponse);

    const result = await AccountsRepository.findOrCreate(input);

    expect(prismaClient.accounts.upsert).toHaveBeenCalledWith({
      where: {
        provider_provider_user_id: {
          provider: input.provider,
          provider_user_id: input.id,
        },
      },
      update: {},
      create: {
        provider: input.provider,
        provider_user_id: input.id,
        user: {
          create: {
            email: input.email,
            first_name: input.firstName,
            last_name: input.lastName,
            avatar_url: input.avatar_url,
            password_hash: '__OAUTH__',
            status: expect.any(String),
          },
        },
      },
      select: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            role: true,
            created_at: true,
            twofa_enabled: true,
          },
        },
      },
    });

    expect(result).toEqual({
      id: prismaResponse.user.id,
      firstName: prismaResponse.user.first_name,
      lastName: prismaResponse.user.last_name,
      email: prismaResponse.user.email,
      role: prismaResponse.user.role,
      createdAt: prismaResponse.user.created_at,
      enabled2FA: prismaResponse.user.twofa_enabled,
    });
  });

  it('should throw AppError on prisma upsert failure', async () => {
    (prismaClient.accounts.upsert as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(AccountsRepository.findOrCreate(input)).rejects.toThrow(AppError);
    await expect(AccountsRepository.findOrCreate(input)).rejects.toMatchObject({
      translationKey: 'errors.internal',
      code: AppStatusCode.INTERNAL_SERVER_ERROR,
      httpStatusCode:500,
    });
  });
});
