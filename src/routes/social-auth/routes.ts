import { Express } from 'express';

export async function loadSocialAuthRoutes(app: Express): Promise<void> {
	if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
		const { default: googleAuthRoutes } = await import('./googleAuthRoutes.js');
		app.use('/auth', googleAuthRoutes);
	}

	if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
		const { default: githubAuthRoutes } = await import('./githubAuthRoutes.js');
		app.use('/auth', githubAuthRoutes);
	}
}
