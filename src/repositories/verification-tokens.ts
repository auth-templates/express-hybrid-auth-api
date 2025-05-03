import { Prisma } from '../../generated/prisma';
import { AppError } from '../lib/error';
import { prismaClient } from '../lib/prisma-client';
import { PrismaErrorCode } from '../lib/prisma-error-codes';
import { verifyToken } from '../lib/token';
import { UserStatus } from '../models/user';
import { TokenType, VerificationToken } from '../models/verification-token';

type CreateVerificationTokenInput = Omit<VerificationToken, 'id' | 'createdAt' | 'usedAt'>

export class VerificationTokensRepository {
    static async createToken(data: CreateVerificationTokenInput): Promise<void> {
        const { type, userId, token, expiresAt } = data;
        try {
            await prismaClient.verification_tokens.create({
                data: { 
                    user: { connect: { id: userId } },
                    token: token,
                    type: type as any,
                    expires_at: expiresAt,
                } as Prisma.verification_tokensCreateInput
            });
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
            const field = (error.meta?.target as string[])[0];
            throw new AppError('errors.is_already_in_use', { item: field }, 409);
          }
        }
        throw new AppError('errors.internal', {}, 500);
      }
    }

    static async verifySignupToken(token: string): Promise<{userId: number}> {
        try {
            const now = new Date();
    
            // Find the most recently created signup token, regardless of status
            const tokenRecord = await prismaClient.verification_tokens.findFirst({
                where: {
                    type: TokenType.SignUp,
                },
                orderBy: { created_at: 'desc' },
            });
    
            // Token not found
            if (!tokenRecord) {
                throw new AppError('tokens.invalid', {}, 400);
            }
    
            const isMatch = await verifyToken(token, tokenRecord.token);
            if (!isMatch) {
                // Provided token doesn't match the hashed one in DB
                throw new AppError('tokens.invalid', {}, 400);
            }
    
            // Check if token is expired
            if (tokenRecord.expires_at < now) {
                throw new AppError('tokens.expired', {}, 400);
            }
    
            // Check if token has already been used
            if (tokenRecord.used_at !== null) {
                throw new AppError('tokens.used', {}, 400);
            }
    
            // Token is valid — mark as used and activate user
            await prismaClient.verification_tokens.update({
                where: { id: tokenRecord.id },
                data: { used_at: now },
            });

            return { userId: tokenRecord.id };
        } catch (error) {
            console.log(error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('errors.internal', {}, 500);
        }
    }
    
}
