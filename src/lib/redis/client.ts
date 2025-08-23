import { Redis } from 'ioredis';
import GlobalConfig from '../../config.js';

export const redisClient = new Redis(GlobalConfig.REDIS_PORT, GlobalConfig.REDIS_HOST);
