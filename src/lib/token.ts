import { generateRandomString, RandomReader } from '@oslojs/crypto/random';
import { webcrypto } from 'node:crypto';
import { hash, verify } from "@node-rs/argon2";

const random: RandomReader = {
    read(bytes: Uint8Array): void {
      webcrypto.getRandomValues(bytes);
    }
};

export async function generateToken() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const token = generateRandomString(random, alphabet, 64);
    const hashedToken = await hash(token);

    return { token, hashedToken };
}

export async function verifyToken(token: string, hashedToken: string) {
    return await verify(hashedToken, token);
}