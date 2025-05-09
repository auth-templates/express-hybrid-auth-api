import { PrismaClient, TokenType, UserStatus } from '../../generated/prisma';
import { hash } from '@node-rs/argon2';
import { createHash } from 'node:crypto';

const createTokenFingerprint = (token: string) => createHash('sha256').update(token).digest('hex');

export async function seedVerificationTokens(prisma: PrismaClient) {
    const users = await prisma.users.findMany();
    const now = new Date();
    const tokens: any[] = [];

    let hasPendingUser = false;
    let hasActiveUser = false;

    for (const user of users) {
        // Only add tokens for the first pending user
        if (!hasPendingUser && user.status === UserStatus.pending) {
            hasPendingUser = true;

            tokens.push({
                user_id: user.id,
                token_hash: await hash(`signup-valid-${user.id}`),
                token_fingerprint: createTokenFingerprint(`signup-valid-${user.id}`),
                type: TokenType.signup,
                expires_at: new Date(now.getTime() + 1000 * 60 * 60 * 24),
                created_at: now,
                used_at: null,
            });

            tokens.push({
                user_id: user.id,
                token_hash: await hash(`signup-used-${user.id}`),
                token_fingerprint: createTokenFingerprint(`signup-used-${user.id}`),
                type: TokenType.signup,
                expires_at: new Date(now.getTime() + 1000 * 60 * 60 * 24),
                created_at: now,
                used_at: new Date(now.getTime() - 1000 * 60 * 60),
            });

            tokens.push({
                user_id: user.id,
                token_hash: await hash(`signup-expired-${user.id}`),
                token_fingerprint: createTokenFingerprint(`signup-expired-${user.id}`),
                type: TokenType.signup,
                expires_at: new Date(now.getTime() - 1000 * 60 * 60),
                created_at: now,
                used_at: null,
            });
        }

        // Only add tokens for the first active user
        if (!hasActiveUser && user.status === UserStatus.active) {
            hasActiveUser = true;

            tokens.push({
                user_id: user.id,
                token_hash: await hash(`twofa-valid-${user.id}`),
                token_fingerprint: createTokenFingerprint(`twofa-valid-${user.id}`),
                type: TokenType.twofa,
                expires_at: new Date(now.getTime() + 1000 * 60 * 10),
                created_at: now,
                used_at: null,
            });

            tokens.push({
                user_id: user.id,
                token_hash: await hash(`twofa-used-${user.id}`),
                token_fingerprint: createTokenFingerprint(`twofa-used-${user.id}`),
                type: TokenType.twofa,
                expires_at: new Date(now.getTime() + 1000 * 60 * 10),
                created_at: now,
                used_at: new Date(now.getTime() - 1000 * 60 * 5),
            });

            tokens.push({
                user_id: user.id,
                token_hash: await hash(`twofa-expired-${user.id}`),
                token_fingerprint: createTokenFingerprint(`twofa-expired-${user.id}`),
                type: TokenType.twofa,
                expires_at: new Date(now.getTime() - 1000 * 60 * 10),
                created_at: now,
                used_at: null,
            });
        }

        // Break early if both have been handled
        if (hasPendingUser && hasActiveUser) {
            break;
        }
    }

    if (tokens.length > 0) {
        await prisma.verification_tokens.createMany({ data: tokens });
        console.log(`${tokens.length} verification tokens seeded.`);
    } else {
        console.log('No eligible users found. No tokens seeded.');
    }
}
