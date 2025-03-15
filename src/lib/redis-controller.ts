import Redis from "ioredis";

export interface Controller {
	add(key: string, value: string, expiresInSeconds: number): Promise<void>;
	addToSet(key: string, value: string): Promise<void>;
	remove(key: string): Promise<void>;
    removeFromSet(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    getAllFromSet(key: string): Promise<string[]>;
    removeMultiple(keys: string[]): Promise<void>;
}

export class RedisController implements Controller {
    client: Redis;
    constructor(client: Redis) {
        this.client = client;
    }

    async add(key: string, value: string, expiresInSeconds: number): Promise<void> {
        await this.client.set(key, value, "EX", expiresInSeconds);
    }

    async addToSet(key: string, value: string): Promise<void> {
        await this.client.sadd(key, value);
    }

    async remove(key: string): Promise<void> {
        await this.client.del(key);
    }

    async removeFromSet(key: string, value: string): Promise<void> {
        await this.client.srem(key, value);
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async getAllFromSet(key: string): Promise<string[]> {
        return this.client.smembers(key);
    }

    async removeMultiple(keys: string[]): Promise<void> {
        const pipeline = this.client.pipeline();

        keys.forEach(key => {
            pipeline.del(key);
        });

        await pipeline.exec();
    }
}