import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { RedisController } from "./redis/redis-controller";
import { redisClient } from "./redis/client";

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

const redisController = new RedisController(redisClient);
 
export async function createSession(token: string, { userId, pending2FA }: {userId: number, pending2FA: boolean}): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        pending2FA
	};
    await redisController.add(`session:${session.id}`,
		JSON.stringify({
			id: session.id,
			user_id: session.userId,
			expires_at: Math.floor(session.expiresAt.getTime() / 1000),
            pending_2fa: pending2FA
		}),  Math.floor(session.expiresAt.getTime() / 1000)
	);
    await redisController.addToSet(`user_sessions:${userId}`, sessionId);

	return session;
}

export async function validateSessionToken(token: string): Promise<Session | null> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const item = await redisController.get(`session:${sessionId}`);
	if ( item === null ) {
		return null;
	}

	const result = JSON.parse(item);
	const session: Session = { 
		id: result.id,
		userId: result.user_id,
		expiresAt: new Date(result.expires_at * 1000),
        pending2FA: result.pending_2fa
	};
	if ( Date.now() >= session.expiresAt.getTime() ) {
		await redisController.remove(`session:${sessionId}`);
		await redisController.removeFromSet(`user_sessions:${session.userId}`, sessionId);
		return null;
	}
	if ( Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15 ) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await redisController.add(
			`session:${session.id}`,
			JSON.stringify({
				id: session.id,
				user_id: session.userId,
				expires_at: Math.floor(session.expiresAt.getTime() / 1000),
                pending_2fa: session.pending2FA
			}), 
            Math.floor(session.expiresAt.getTime() / 1000)
		);
	}
	return session;
}

export async function invalidateSession(sessionId: string, userId: number): Promise<void> {
	await redisController.remove(`session:${sessionId}`);
	await redisController.removeFromSet(`user_sessions:${userId}`, sessionId);
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	const sessionIds = await redisController.getAllFromSet(`user_sessions:${userId}`);
	if ( sessionIds.length < 1 ) {
		return;
	}
    await redisController.removeMultiple([...sessionIds, `user_sessions:${userId}`]);
}

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
    pending2FA?: boolean;
}