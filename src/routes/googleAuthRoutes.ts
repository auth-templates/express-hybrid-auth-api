import { Router, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models/user';
import { AppError } from '../lib/error';
import { initializeUserSession } from '../lib/session';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), 
  async (request: Request, response: Response) => {
    try {
        console.log("request", request.user);

        const user = request.user as User;
        await initializeUserSession(request, response, user);

        response.status(200).send(user);
    } catch (error) {
        if (error instanceof AppError) {
            response.status(error.statusCode).json({
              message: request.t(error.translationKey, error.params),
            });
            return
        }
        response.status(500).json({ message: request.t('errors.internal') });
    }
  }
);

export default router;
