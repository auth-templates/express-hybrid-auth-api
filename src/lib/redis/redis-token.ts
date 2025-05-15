import { RedisController } from "./redis-controller";
import GlobalConfig from "../../config";
import { redisClient } from "./client";

const redisController = new RedisController(redisClient);

export class RefreshTokenStore {
    static async storeRefreshToken(userId: number, refreshToken: string): Promise<void> { 
        await redisController.add(`refresh:${userId}:${refreshToken}`, refreshToken, GlobalConfig.SESSION_MAX_AGE);
    }

    static async getStoredRefreshToken(ssid: string, refreshToken: string): Promise<string> {    
        return await redisController.get(`refresh:${ssid}:${refreshToken}`);
    }

    static async resetRefreshTokenExpiration(userId: number, refreshToken: string): Promise<void> {
        await redisController.resetExpiration(`refresh:${userId}:${refreshToken}`, GlobalConfig.SESSION_MAX_AGE);
    }

    static async removeRefreshToken(userId: number, refreshToken: string): Promise<void> {
        await redisController.remove(`refresh:${userId}:${refreshToken}`);
    }
}
