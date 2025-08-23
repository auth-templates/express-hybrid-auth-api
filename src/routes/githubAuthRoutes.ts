import { Router, Request, Response } from 'express';
import passport from 'passport';
import { initializeUserSession } from '../lib/session.js';
import { User } from '../models/user.js';
import { AppError } from '../lib/error.js';

const router = Router();

router.get('/github', passport.authenticate('github'));

router.get(
	'/github/callback',
	passport.authenticate('github', { failureRedirect: '/' }),
	async (request: Request, response: Response) => {
		try {
			console.log('request', request.user);

			const user = request.user as User;
			await initializeUserSession(request, response, user);

			response.status(200).send(user);
		} catch (error) {
			if (error instanceof AppError) {
				response.status(error.httpStatusCode).json({
					message: request.t(error.translationKey, error.params),
				});
				return;
			}
			response.status(500).json({ message: request.t('errors.internal') });
		}
	}
);

export default router;
