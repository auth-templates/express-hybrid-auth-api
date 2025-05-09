import { generateRandomString, RandomReader } from '@oslojs/crypto/random';
import { createHash, webcrypto } from 'node:crypto';
import { hash, verify } from "@node-rs/argon2";

const random: RandomReader = {
    read(bytes: Uint8Array): void {
      webcrypto.getRandomValues(bytes);
    }
};

export function createTokenFingerprint(token: string): string {
    return createHash('sha256').update(token).digest('hex');
}

export async function generateToken() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const token = generateRandomString(random, alphabet, 64);
    const tokenFingerprint = createTokenFingerprint(token);
    const hashedToken = await hash(token);

    return { token, tokenFingerprint, hashedToken };
}

export async function verifyToken(token: string, hashedToken: string) {
    return await verify(hashedToken, token);
}