import { Express, Request, Response } from 'express';
import path from 'path';
import appRoot from 'app-root-path';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../../swagger-config.js';

export function registerDevRoutes(app: Express): void {
	// Swagger UI
	app.use('/swagger-dark.css', (req, res, next) => {
		res.sendFile(path.join(appRoot.path, 'public/swagger-dark.css'));
	});

	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, { customCssUrl: '/swagger-dark.css' }));

	// Social login demo page
	app.get('/', (req: Request, res: Response) => {
		res.send(`
			<h1>Social Login Demo</h1>
			<a href="/auth/google">Login with Google</a> | 
			<a href="/auth/github">Login with GitHub</a>
		`);
	});

	// Profile page
	app.get('/profile', (req: Request, res: Response) => {
		if (!req.isAuthenticated()) {
			return res.redirect('/');
		}
		res.send(`
			<h1>Hello ${JSON.stringify(req.user)}</h1>
			<a href="/auth/logout">Logout</a>
		`);
	});
}
