import { hash, verify } from "@node-rs/argon2";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

export async function hashPassword(password: string): Promise<string> {
	return await hash(password);
}

export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
	return await verify(hash, password);
}

export async function isPasswordPwned(password: string): Promise<boolean> {
	const hash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
	const hashPrefix = hash.slice(0, 5);
	const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`);
	const data = await response.text();
	const items = data.split("\n");
	for (const item of items) {
		const hashSuffix = item.slice(0, 35).toLowerCase();
		if (hash === hashPrefix + hashSuffix) {
			return false;
		}
	}
	return true;
}