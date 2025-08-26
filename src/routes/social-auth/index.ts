import { Express } from 'express';
import { registerSocialStrategies } from './strategies.js';
import { loadSocialAuthRoutes } from './routes.js';

export async function setupSocialAuth(app: Express): Promise<void> {
	registerSocialStrategies();
	await loadSocialAuthRoutes(app);
}
