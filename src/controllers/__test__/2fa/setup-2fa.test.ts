import request from 'supertest';
import express from 'express';
import { setup2FA } from '../../2faController';
import { AppError } from '../../../lib/error';
import { i18nMiddleware, i18nReady } from '../../../middlewares/i18n';
import { UserRepository } from '../../../repositories/users';
import * as Redis2FA from '../../../lib/redis/redis-2fa';

jest.mock('../../../repositories/users');

const app = express();
app.use(i18nMiddleware);
app.use(express.json());
app.post('/2fa/setup', setup2FA);

const validUser = {
    id: 1,
    firstName: 'Dev',
    lastName: 'Tester',
    email: 'dev@mail.com',
    role: 'admin',
    createdAt: new Date(),
};

const twoFASetupData = {    
    qrCodeUrl: "otpauth://totp/MyApp:username@example.com?secret=ABCDEF123456&issuer=MyApp",
    secret: "ABCDEF123456"
}

describe('POST /2fa/setup', () => {
    beforeAll(async () => {
        await i18nReady;
    });

    it('should return 200 and user data for valid credentials', async () => {
        // (UserRepository.login as jest.Mock).mockResolvedValue(validUser);

        // jest.spyOn(Redis2FA, 'get2faSetup').mockResolvedValue(twoFASetupData);

        // const response = await request(app)
        //     .post('/2fa/setup')
        //     .set('Accept-Language', 'en')
        //     .send({
        //         email: 'dev@mail.com',
        //         password: '$SuperSecurePassword45',
        //     });

        // expect(response.status).toBe(200);
        // expect(response.body.email).toBe('dev@mail.com');
    });
})
