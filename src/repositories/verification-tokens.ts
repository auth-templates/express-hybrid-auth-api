import { hash } from '@node-rs/argon2';
import { Prisma } from '../../generated/prisma';
import { AppError } from '../lib/error';
import { prismaClient } from '../lib/prisma-client';
import { PrismaErrorCode } from '../lib/prisma-error-codes';
import { TokenType, VerificationToken } from '../models/verification-token';

import { createTokenFingerprint } from '../lib/token';

type CreateVerificationTokenInput = Omit<VerificationToken, 'id' | 'createdAt' | 'usedAt' | 'token'> & { tokenHash: string, tokenFingerprint: string }

export class VerificationTokensRepository {
    static async createToken(data: CreateVerificationTokenInput): Promise<void> {
        const { type, userId, tokenHash, tokenFingerprint, expiresAt } = data;
        try {
            await prismaClient.verification_tokens.create({
                data: { 
                    user: { connect: { id: userId } },
                    token_fingerprint: tokenFingerprint,
                    token_hash: tokenHash,
                    type: type as any,
                    expires_at: expiresAt,
                } as Prisma.verification_tokensCreateInput
            });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === PrismaErrorCode.RecordNotFound) {
            throw new AppError('errors.user_not_found', {}, 404);
          }
        }
        throw new AppError('errors.internal', {}, 500);
      }
    }

    static async verifySignupToken(token: string): Promise<{userId: number}> {
        try {
            const now = new Date();
    
            const tokenRecord = await prismaClient.verification_tokens.findFirst({
                where: {
                    type: TokenType.SignUp,
                    token_fingerprint: createTokenFingerprint(token)
                },
                orderBy: { created_at: 'desc' },
            });

    

            if ( !tokenRecord ) {
                throw new AppError('tokens.signup.invalid', {}, 400);
            }
    
            // Check if token is expired
            if (tokenRecord.expires_at < now) {
                throw new AppError('tokens.signup.expired', {}, 400);
            }
    
            // Check if token has already been used
            if (tokenRecord.used_at !== null) {
                throw new AppError('tokens.signup.used', {}, 400);
            }
    
            // Token is valid — mark as used and activate user
            await prismaClient.verification_tokens.update({
                where: { id: tokenRecord.id },
                data: { used_at: now },
            });

            return { userId: tokenRecord.user_id };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('errors.internal', {}, 500);
        }
    }
    
    static async verify2FAToken(token: string): Promise<{userId: number}> {
        try {
            const now = new Date();
    
            // Find the most recently created signup token, regardless of status
            const tokenRecord = await prismaClient.verification_tokens.findFirst({
                where: {
                    type: TokenType.TwoFA,
                    token_fingerprint: createTokenFingerprint(token)
                },
                orderBy: { created_at: 'desc' },
            });

            console.log("TOKEN RECORD", await hash(token), tokenRecord);
            
            if ( !tokenRecord ) {
                throw new AppError('tokens.2fa.invalid', {}, 400);
            }
    
            // Check if token is expired
            if (tokenRecord.expires_at < now) {
                throw new AppError('tokens.2fa.expired', {}, 400);
            }
    
            // Check if token has already been used
            if (tokenRecord.used_at !== null) {
                throw new AppError('tokens.2fa.used', {}, 400);
            }
    
            // Token is valid — mark as used and activate user
            await prismaClient.verification_tokens.update({
                where: { id: tokenRecord.id },
                data: { used_at: now },
            });

            return { userId: tokenRecord.user_id };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('errors.internal', {}, 500);
        }
    }
    
    static async verifyPasswordResetToken(token: string): Promise<{userId: number}> {
        try {
            const now = new Date();
    
            // Find the most recently created signup token, regardless of status
            const tokenRecord = await prismaClient.verification_tokens.findFirst({
                where: {
                    type: TokenType.PasswordReset,
                    token_fingerprint: createTokenFingerprint(token)
                },
                orderBy: { created_at: 'desc' },
            });

            console.log("TOKEN RECORD", await hash(token), tokenRecord);
            
            if ( !tokenRecord ) {
                throw new AppError('tokens.reset-password.invalid', {}, 400);
            }
    
            // Check if token is expired
            if (tokenRecord.expires_at < now) {
                throw new AppError('tokens.reset-password.expired', {}, 400);
            }
    
            // Check if token has already been used
            if (tokenRecord.used_at !== null) {
                throw new AppError('tokens.reset-password.used', {}, 400);
            }
    
            // Token is valid — mark as used and activate user
            await prismaClient.verification_tokens.update({
                where: { id: tokenRecord.id },
                data: { used_at: now },
            });

            return { userId: tokenRecord.user_id };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('errors.internal', {}, 500);
        }
    }
}