import { hashPassword, verifyPasswordHash } from '../password.js';
import { hash, verify } from '@node-rs/argon2';

// Mock `@node-rs/argon2`
vi.mock('@node-rs/argon2', () => ({
    hash: vi.fn(),
    verify: vi.fn(),
}));

describe('hashPassword', () => {
    it('calls argon2.hash and returns the hash', async () => {
        const mockHash = '$argon2i$mocked-hash';
        vi.mocked(hash).mockResolvedValue(mockHash);

        const result = await hashPassword('password123');
        expect(hash).toHaveBeenCalledWith('password123');
        expect(result).toBe(mockHash);
    });
});

describe('verifyPasswordHash', () => {
    it('calls argon2.verify and returns true', async () => {
        vi.mocked(verify).mockResolvedValue(true);

        const result = await verifyPasswordHash('$argon2i$somehash', 'password123');
        expect(verify).toHaveBeenCalledWith('$argon2i$somehash', 'password123');
        expect(result).toBe(true);
    });

    it('returns false when verification fails', async () => {
        vi.mocked(verify).mockResolvedValue(false);

        const result = await verifyPasswordHash('$argon2i$badhash', 'wrongpassword');
        expect(result).toBe(false);
    });
});
