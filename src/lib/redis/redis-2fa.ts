import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { RedisController } from './redis-controller';
import Redis from 'ioredis';
import config from '../../config';
import { AppError } from '../error';

const redisClient = new Redis(); 
const redisController = new RedisController(redisClient);

const TEMP_SECRET_EXPIRY = 600; // 10 minutes expiration

type TwofaSetup = {
    qrCodeUrl: string, 
    secret: string
}

export async function verify2faSetup(userId: string, code: string): Promise<string> {
    const tempSecret = await redisController.get(`2fa:temp:${userId}`);
        
    if ( !tempSecret ) {
        throw new AppError('errors.2fa_setup_invalid', {}, 400);
    }

    const isValid = authenticator.verify({ token: code, secret: tempSecret });

    if ( !isValid ) {
        throw new AppError( 'errors.invalid_verification_code', {}, 400);
    }

    await redisController.remove(`2fa:temp:${userId}`);

    return tempSecret;
}

export async function get2faSetup(userId: number, userEmail: string): Promise<TwofaSetup> {
    const secret = authenticator.generateSecret();

    const otpauth = authenticator.keyuri(userEmail, config.APP_NAME, secret);
    const qrCodeUrl = await qrcode.toDataURL(otpauth);

    await redisController.add(`2fa:temp:${userId}`, secret, TEMP_SECRET_EXPIRY);
    return {qrCodeUrl, secret}
}
