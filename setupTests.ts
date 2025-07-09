
import dotenv from 'dotenv';

dotenv.config({path: `.env.testing`});

jest.mock('@/lib/logger', () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
}));


beforeAll(async () => {

});

afterAll(() => {

});
