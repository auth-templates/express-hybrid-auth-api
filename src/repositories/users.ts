import { Prisma } from '../../generated/prisma';
import { AppError } from '../lib/error';
import logger from '@/lib/logger';
import { verifyPasswordHash } from '../lib/password';
import { prismaClient } from '../lib/prisma-client';
import { PrismaErrorCode } from '../lib/prisma-error-codes';
import { Role, User, UserStatus } from '../models/user';
import { AppStatusCode } from '@/@types/status-code';

type CreateUserInput = Omit<User, 'id' | 'createdAt'> & { passwordHash: string }

export class UserRepository {
    static async getUser2FASecretById(userId: number): Promise<string> {
        try {
            const result = await prismaClient.users.findUnique({
                where: { id: userId },
                select: {
                    twofa_secret: true
                }
            });

            if (!result || !result.twofa_secret) {
                throw new AppError('errors.2fa_not_configured', {}, AppStatusCode.TWO_FA_NOT_CONFIGURED, 403);
            }

            return result.twofa_secret;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }

    static async acceptTerms(userId: number, acceptTerms: boolean): Promise<void> {
        try {
            await prismaClient.users.update({
                where: { id: userId },
                data: { terms_accepted: acceptTerms },
            });
        } catch(error) {
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }
    
    static async createUser(data: CreateUserInput): Promise<number> {
        const { firstName: first_name, lastName: last_name, email, passwordHash: password_hash, termsAccepted: terms_accepted, role  } = data;
        try {
            const user =  await prismaClient.users.create({ 
                data: { 
                    first_name, 
                    last_name, 
                    email, 
                    password_hash, 
                    terms_accepted,
                    role 
                } as Prisma.usersCreateInput
           });
           return user.id;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
            throw new AppError('errors.email_address_already_in_use', {}, AppStatusCode.EMAIL_ALREADY_IN_USE, 409);
          }
        }
        logger.error(error);
        throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
      }
    }

    static async updatePassword(userId: number, password_hash: string): Promise<void> {
        try {
            await prismaClient.users.update({
                where: { id: userId },
                data: {
                    password_hash,
                },
            });
        } catch (error) {
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }
    
    static async updateUserStatus(userId: number, status: UserStatus): Promise<void> {
        try {
            const now = new Date();
            await prismaClient.users.update({
                where: { id: userId },
                data: {
                    status: status,
                    status_changed_at: now,
                },
            });
        } catch (error) {
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }

    static async login(email: string, password: string): Promise<User> {
        try {
            const userRecord = await prismaClient.users.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    password_hash: true, 
                    role: true,
                    created_at: true,
                    twofa_enabled: true
                },
            });
            
            if ( !userRecord ) {
                throw new AppError('errors.invalid_credentials', {}, AppStatusCode.INVALID_CREDENTIALS, 400);
            }

            if ( userRecord.password_hash === '__OAUTH__' ) {
                throw new AppError('errors.social_login_required', {}, AppStatusCode.SOCIAL_LOGIN_REQUIRED, 401);
            }

            const isMatch = await verifyPasswordHash(userRecord.password_hash, password);

            if ( !isMatch ) {
                throw new AppError('errors.invalid_credentials', {}, AppStatusCode.INVALID_CREDENTIALS, 400);
            }

            const user: User = {
                id: userRecord.id,
                firstName: userRecord.first_name,
                lastName: userRecord.last_name,
                email: userRecord.email,
                role: userRecord.role as Role,
                createdAt: userRecord.created_at || new Date(),
                enabled2FA: userRecord.twofa_enabled
            };

            return user;
        } catch (error) {
            if ( error instanceof AppError ) {
                throw error
            }
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }
    
    static async getUserById(id: number): Promise<User> {
        try {
            const userRecord = await prismaClient.users.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    password_hash: true, 
                    role: true,
                    created_at: true,
                    twofa_enabled: true
                },
            });
            
            if ( !userRecord ) {
                throw new AppError('errors.user_not_found', {}, AppStatusCode.USER_NOT_FOUND, 404);
            }

            const user: User = {
                id: userRecord.id,
                firstName: userRecord.first_name,
                lastName: userRecord.last_name,
                email: userRecord.email,
                role: userRecord.role as Role,
                createdAt: userRecord.created_at || new Date(),
                enabled2FA: userRecord.twofa_enabled
            };

            return user;
        } catch (error) {
            if ( error instanceof AppError ) {
                throw error
            }
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }

    static async getUserByEmail(email: string): Promise<User> {
        try {
            const userRecord = await prismaClient.users.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    password_hash: true, 
                    role: true,
                    created_at: true,
                    twofa_enabled: true
                },
            });
            
            if ( !userRecord ) {
                throw new AppError('errors.user_email_not_found', {}, AppStatusCode.USER_NOT_FOUND, 404);
            }

            const user: User = {
                id: userRecord.id,
                firstName: userRecord.first_name,
                lastName: userRecord.last_name,
                email: userRecord.email,
                role: userRecord.role as Role,
                createdAt: userRecord.created_at || new Date(),
                enabled2FA: userRecord.twofa_enabled
            };

            return user;
        } catch (error) {
            if ( error instanceof AppError ) {
                throw error
            }
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }

    static async verifyAndSaveSecret(userId: number, twofa_secret: string): Promise<void> {
        try {
            await prismaClient.users.update({
                where: { id: userId },
                data: {
                    twofa_secret: twofa_secret,
                    twofa_enabled: true
                },
            });
        } catch (error) {
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }
    
    static async disable2FA(userId: number): Promise<void> {
        try {
            await prismaClient.users.update({
                where: { id: userId },
                data: { twofa_secret: null },
            });
        } catch (error) {
            logger.error(error);
            throw new AppError('errors.internal', {}, AppStatusCode.INTERNAL_SERVER_ERROR, 500);
        }
    }
}
