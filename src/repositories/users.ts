import { Prisma } from '../../generated/prisma';
import { AppError } from '../lib/error';
import { verifyPasswordHash } from '../lib/password';
import { prismaClient } from '../lib/prisma-client';
import { PrismaErrorCode } from '../lib/prisma-error-codes';
import { Role, User, UserStatus } from '../models/user';

type CreateUserInput = Omit<User, 'id' | 'createdAt'> & { passwordHash: string }

export class UserRepository {
    static async createUser(data: CreateUserInput): Promise<number> {
        const { firstName: first_name, lastName: last_name, email, passwordHash: password_hash, role  } = data;
        try {
            const user =  await prismaClient.users.create({ 
                data: { 
                    first_name, 
                    last_name, 
                    email, 
                    password_hash, 
                    role 
                } as Prisma.usersCreateInput
           });
           return user.id;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
            const field = (error.meta?.target as string[])[0];
            throw new AppError('errors.is_already_in_use', { item: field }, 409);
          }
        }
        throw new AppError('errors.internal', {}, 500);
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
            console.log(error);
            throw new AppError('errors.internal', {}, 500);
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
                throw new AppError('errors.invalid_credentials', {}, 400);
            }

            const isMatch = await verifyPasswordHash(userRecord.password_hash, password);

            if ( !isMatch ) {
                throw new AppError('errors.invalid_credentials', {}, 400);
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
            throw new AppError('errors.internal', {}, 500);
        }
    }    
}
