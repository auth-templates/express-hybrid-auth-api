/// <reference types="vitest/globals" />

import dotenv from 'dotenv';

dotenv.config({ path: `.env.testing` });

vi.mock('@/lib/redis/client.js', () => ({
	redisClient: {
		get: vi.fn(),
		set: vi.fn(),
		del: vi.fn(),
		expire: vi.fn(),
	},
}));

vi.mock('@/lib/logger/index.js', () => ({
	default: {
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
		debug: vi.fn(),
	},
}));

beforeAll(async () => {});

afterAll(() => {});
