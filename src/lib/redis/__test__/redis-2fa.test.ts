
import { authenticator } from 'otplib';
import { RedisController } from '../redis-controller.js';
import { get2faSetup, verify2faSetup } from '../redis-2fa.js';
import { AppError } from '../../error.js';
import qrcode from 'qrcode';
import config from '../../../config.js';
import { AppStatusCode } from '@/@types/status-code.js';

vi.mock('qrcode', () => ({
  __esModule: true, // <- Important for default export mocking
  default: {
    toDataURL: vi.fn(),
  },
}));

vi.mock('otplib', () => ({
    authenticator: {
        verify: vi.fn(),
        generateSecret: vi.fn(),
        keyuri: vi.fn(),
    },
}));

describe('verify2faSetup', () => {
    const userId = 123;
    const code = '654321';
    const tempSecret = 'TEST_SECRET';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns tempSecret on successful verification', async () => {
        vi.spyOn(RedisController.prototype, 'get').mockResolvedValue(tempSecret);
        vi.spyOn(RedisController.prototype, 'remove').mockResolvedValue(undefined);
        vi.mocked(authenticator.verify).mockReturnValue(true);

        const result = await verify2faSetup(userId, code);

        expect(result).toBe(tempSecret);
        expect(RedisController.prototype.get).toHaveBeenCalledWith(`2fa:temp:${userId}`);
        expect(authenticator.verify).toHaveBeenCalledWith({ token: code, secret: tempSecret });
        expect(RedisController.prototype.remove).toHaveBeenCalledWith(`2fa:temp:${userId}`);
    });

    it('throws AppError if 2FA setup token is missing', async () => {
        vi.spyOn(RedisController.prototype, 'get').mockResolvedValue(null);
        vi.spyOn(RedisController.prototype, 'remove').mockResolvedValue(undefined);

        await expect(verify2faSetup(userId, code)).rejects.toThrow(AppError);
        await expect(verify2faSetup(userId, code)).rejects.toMatchObject({
            translationKey: 'errors.2fa_setup_invalid',
            httpStatusCode:400,
            code: AppStatusCode.TWO_FA_SETUP_INVALID
        });

        expect(authenticator.verify).not.toHaveBeenCalled();
        expect(RedisController.prototype.remove).not.toHaveBeenCalled();
    })

    it('throws AppError if 2FA setup token is invalid', async () => {
        vi.spyOn(RedisController.prototype, 'get').mockResolvedValue(tempSecret);
        vi.spyOn(RedisController.prototype, 'remove').mockResolvedValue(undefined);
        vi.mocked(authenticator.verify).mockReturnValue(false);

        await expect(verify2faSetup(userId, code)).rejects.toThrow(AppError);
        await expect(verify2faSetup(userId, code)).rejects.toMatchObject({
            translationKey: 'errors.2fa_verification_code_invalid',
            httpStatusCode:400,
            code: AppStatusCode.TWO_FA_VERIFICATION_CODE_INVALID
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
        vi.clearAllMocks();
    });

    it('generates secret, stores it, and returns qrCodeUrl and secret', async () => {
        vi.mocked(authenticator.generateSecret).mockReturnValue(secret);
        vi.mocked(authenticator.keyuri).mockReturnValue(otpauth);
        
        vi.mocked(qrcode.toDataURL).mockResolvedValue(qrCodeUrl as any);

        const redisAddSpy = vi.spyOn(RedisController.prototype, 'add').mockResolvedValue(undefined);

        const result = await get2faSetup(userId, userEmail);

        expect(authenticator.generateSecret).toHaveBeenCalled();
        expect(authenticator.keyuri).toHaveBeenCalledWith(userEmail, config.APP_NAME, secret);
        expect(qrcode.toDataURL).toHaveBeenCalledWith(otpauth);
        expect(redisAddSpy).toHaveBeenCalledWith(`2fa:temp:${userId}`, secret, TEMP_SECRET_EXPIRY);

        expect(result).toEqual({ qrCodeUrl, secret });
    });
});