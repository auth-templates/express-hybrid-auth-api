import { RedisController } from "./redis-controller.js";
import GlobalConfig from "../../config.js";
import { redisClient } from "./client.js";

const redisController = new RedisController(redisClient);

export class RefreshTokenStore {
    static async storeRefreshToken(userId: number, refreshToken: string): Promise<void> { 
        await redisController.add(`refresh:${userId}:${refreshToken}`, refreshToken, GlobalConfig.SESSION_MAX_AGE);
    }

    static async getStoredRefreshToken(userId: number, refreshToken: string): Promise<string> {    
        return await redisController.get(`refresh:${userId}:${refreshToken}`);
    }

    static async resetRefreshTokenExpiration(userId: number, refreshToken: string): Promise<void> {
        await redisController.resetExpiration(`refresh:${userId}:${refreshToken}`, GlobalConfig.SESSION_MAX_AGE);
    }

    static async removeRefreshToken(userId: number, refreshToken: string): Promise<void> {
        await redisController.remove(`refresh:${userId}:${refreshToken}`);
    }
}
