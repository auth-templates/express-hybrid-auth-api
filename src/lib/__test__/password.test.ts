import { encodeHexLowerCase } from '@oslojs/encoding';
import { hashPassword, verifyPasswordHash } from '../password.js';
import { hash, verify } from '@node-rs/argon2';
import { sha256 } from '@oslojs/crypto/sha2';

// Mock `@node-rs/argon2`
jest.mock('@node-rs/argon2', () => ({
    hash: jest.fn(),
    verify: jest.fn(),
}));

describe('hashPassword', () => {
    it('calls argon2.hash and returns the hash', async () => {
        const mockHash = '$argon2i$mocked-hash';
        (hash as jest.Mock).mockResolvedValue(mockHash);

        const result = await hashPassword('password123');
        expect(hash).toHaveBeenCalledWith('password123');
        expect(result).toBe(mockHash);
    });
});

describe('verifyPasswordHash', () => {
    it('calls argon2.verify and returns true', async () => {
        (verify as jest.Mock).mockResolvedValue(true);

        const result = await verifyPasswordHash('$argon2i$somehash', 'password123');
        expect(verify).toHaveBeenCalledWith('$argon2i$somehash', 'password123');
        expect(result).toBe(true);
    });

    it('returns false when verification fails', async () => {
        (verify as jest.Mock).mockResolvedValue(false);

        const result = await verifyPasswordHash('$argon2i$badhash', 'wrongpassword');
        expect(result).toBe(false);
    });
});
