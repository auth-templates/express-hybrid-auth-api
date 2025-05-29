import { Prisma } from '../../generated/prisma';
import { AppError } from '../lib/error';
import { verifyPasswordHash } from '../lib/password';
import { prismaClient } from '../lib/prisma-client';
import { PrismaErrorCode } from '../lib/prisma-error-codes';
import { Role, User, UserStatus } from '../models/user';

export type createAccountInput = {
    id: string,
    provider: string,
    email: string, 
    avatar_url: string,
    firstName: string, 
    lastName: string
}

export class AccountsRepository {
    static async findOrCreate({id, provider, email, avatar_url, firstName, lastName}: createAccountInput): Promise<User> {
        try {
            const account = await prismaClient.accounts.upsert({
                where: { 
                    provider_provider_user_id: {
                        provider: provider,
                        provider_user_id: id,
                    }
                },
                update: {}, // <- required even if you don't want to update anything
                create: {
                    provider: provider,
                    provider_user_id: id,
                    // include any other required fields here
                    user: {
                        create: {
                            email: email,
                            first_name: firstName,
                            last_name: lastName,
                            avatar_url: avatar_url,
                            password_hash: '__OAUTH__', // optional if OAuth-only
                            status: UserStatus.Active, // or 'pending' depending on your logic
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

            const user = account.user;

            return {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role as Role,
                createdAt: user.created_at,
                enabled2FA: user.twofa_enabled,
            };
        } catch (error) {
            if ( error instanceof AppError ) {
                throw error
            }
            throw new AppError('errors.internal', {}, 500);
        }
    }
}