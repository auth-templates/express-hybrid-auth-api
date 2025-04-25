import { Prisma } from '../../generated/prisma';
import { AppError } from '../lib/error';
import { prismaClient } from '../lib/prisma-client';
import { PrismaErrorCode } from '../lib/prisma-error-codes';
import { User } from '../models/user';

type CreateUserInput = Omit<User, 'id' | 'createdAt'> & { passwordHash: string }

export class UserRepository {
    static async createUser(data: CreateUserInput): Promise<void> {
        const { firstName: first_name, lastName: last_name, email, passwordHash: password_hash, role  } = data;
        try {
            await prismaClient.users.create({ 
                data: { 
                    first_name, 
                    last_name, 
                    email, 
                    password_hash, 
                    role 
                } as Prisma.usersCreateInput
        });
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
}
