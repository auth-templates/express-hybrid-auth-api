import { generateRandomString, RandomReader } from '@oslojs/crypto/random';
import { createHash, webcrypto } from 'node:crypto';
import { hash, verify } from "@node-rs/argon2";
import GlobalConfig from '../config';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto'

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

export function createAccessToken(data: {userId: number, pending2FA?: boolean}) {
    return jwt.sign(
        data,
        GlobalConfig.ACCESS_TOKEN_SECRET,
        { expiresIn: GlobalConfig.ACCESS_TOKEN_MAX_AGE }
    );
}

export function createSecureRandomToken(): string {
  return randomBytes(48).toString('hex'); // 96-character hex string
}