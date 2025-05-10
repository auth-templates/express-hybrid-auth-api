import Redis from "ioredis";
import GlobalConfig from "../../config";

export const redisClient = new Redis(GlobalConfig.REDIS_PORT, GlobalConfig.REDIS_HOST)