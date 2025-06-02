
import { authenticator } from 'otplib';
import { RedisController } from '../redis-controller';
import { get2faSetup, verify2faSetup } from '../redis-2fa';
import { AppError } from '../../error';
import qrcode from 'qrcode';
import config from '../../../config';

jest.mock('qrcode', () => ({
  __esModule: true, // <- Important for default export mocking
  default: {
    toDataURL: jest.fn(),
  },
}));

jest.mock('otplib', () => ({
    authenticator: {
        verify: jest.fn(),
        generateSecret: jest.fn(),
        keyuri: jest.fn(),
    },
}));

describe('verify2faSetup', () => {
    const userId = 123;
    const code = '654321';
    const tempSecret = 'TEST_SECRET';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns tempSecret on successful verification', async () => {
        jest.spyOn(RedisController.prototype, 'get').mockResolvedValue(tempSecret);
        jest.spyOn(RedisController.prototype, 'remove').mockResolvedValue(undefined);
        (authenticator.verify as jest.Mock).mockReturnValue(true);

        const result = await verify2faSetup(userId, code);

        expect(result).toBe(tempSecret);
        expect(RedisController.prototype.get).toHaveBeenCalledWith(`2fa:temp:${userId}`);
        expect(authenticator.verify).toHaveBeenCalledWith({ token: code, secret: tempSecret });
        expect(RedisController.prototype.remove).toHaveBeenCalledWith(`2fa:temp:${userId}`);
    });

    it('throws AppError if 2FA setup token is missing', async () => {
        jest.spyOn(RedisController.prototype, 'get').mockResolvedValue(null);
        jest.spyOn(RedisController.prototype, 'remove').mockResolvedValue(undefined);

        await expect(verify2faSetup(userId, code)).rejects.toThrow(AppError);
        await expect(verify2faSetup(userId, code)).rejects.toMatchObject({
            translationKey: 'errors.2fa_setup_invalid',
            statusCode: 400,
        });

        expect(authenticator.verify).not.toHaveBeenCalled();
        expect(RedisController.prototype.remove).not.toHaveBeenCalled();
    })

    it('throws AppError if 2FA setup token is invalid', async () => {
        jest.spyOn(RedisController.prototype, 'get').mockResolvedValue(tempSecret);
        jest.spyOn(RedisController.prototype, 'remove').mockResolvedValue(undefined);
        (authenticator.verify as jest.Mock).mockReturnValue(false);

        await expect(verify2faSetup(userId, code)).rejects.toThrow(AppError);
        await expect(verify2faSetup(userId, code)).rejects.toMatchObject({
            translationKey: 'errors.invalid_verification_code',
            statusCode: 400,
        });

        expect(authenticator.verify).toHaveBeenCalledWith({ token: code, secret: tempSecret });
        expect(RedisController.prototype.remove).not.toHaveBeenCalled();
    })
})


describe('get2faSetup', () => {
    const userId = 123;
    const userEmail = 'user@example.com';
    const secret = 'SECRET123';
    const otpauth = 'otpauth://totp/App:user@example.com?secret=SECRET123&issuer=App';
    const qrCodeUrl = 'data:image/png;base64,FAKE_QR_CODE';
    const TEMP_SECRET_EXPIRY = 600;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('generates secret, stores it, and returns qrCodeUrl and secret', async () => {
        (authenticator.generateSecret as jest.Mock).mockReturnValue(secret);
        (authenticator.keyuri as jest.Mock).mockReturnValue(otpauth);
        
        (qrcode.toDataURL as jest.Mock).mockResolvedValue(qrCodeUrl);

        const redisAddSpy = jest.spyOn(RedisController.prototype, 'add').mockResolvedValue(undefined);

        const result = await get2faSetup(userId, userEmail);

        expect(authenticator.generateSecret).toHaveBeenCalled();
        expect(authenticator.keyuri).toHaveBeenCalledWith(userEmail, config.APP_NAME, secret);
        expect(qrcode.toDataURL).toHaveBeenCalledWith(otpauth);
        expect(redisAddSpy).toHaveBeenCalledWith(`2fa:temp:${userId}`, secret, TEMP_SECRET_EXPIRY);

        expect(result).toEqual({ qrCodeUrl, secret });
    });
});