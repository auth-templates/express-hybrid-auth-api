import { type Redis } from 'ioredis';

export interface Controller {
	add(key: string, value: string, expiresInMilliseconds: number): Promise<void>;
	addToSet(key: string, value: string): Promise<void>;
	remove(key: string): Promise<void>;
	removeFromSet(key: string, value: string): Promise<void>;
	get(key: string): Promise<string | null>;
	getAllFromSet(key: string): Promise<string[]>;
	isMemberOfSet(key: string, value: string): Promise<boolean>;
	resetExpiration(key: string, expiresInMilliseconds: number): Promise<void>;
	removeMultiple(keys: string[]): Promise<void>;
}

export class RedisController implements Controller {
	client: Redis;
	constructor(client: Redis) {
		this.client = client;
	}

	async add(key: string, value: string, expiresInMilliseconds: number): Promise<void> {
		await this.client.set(key, value, 'PX', expiresInMilliseconds);
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

	async isMemberOfSet(key: string, value: string): Promise<boolean> {
		const result = await this.client.sismember(key, value);
		return result === 1;
	}

	async resetExpiration(key: string, expiresInMilliseconds: number): Promise<void> {
		await this.client.pexpire(key, expiresInMilliseconds);
	}

	async removeMultiple(keys: string[]): Promise<void> {
		const pipeline = this.client.pipeline();

		keys.forEach((key) => {
			pipeline.del(key);
		});

		await pipeline.exec();
	}
}
