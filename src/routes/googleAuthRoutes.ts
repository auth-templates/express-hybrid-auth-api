import { Router, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models/user';
import { AppError } from '../lib/error';
import { initializeUserSession } from '../lib/session';

const router = Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth Login
 *     description: >
 *       Redirects the user to Google for OAuth login. This endpoint is used internally by the OAuth flow
 *       and should not be called directly by API clients.
 *     responses:
 *       302:
 *         description: Redirects to Google's OAuth consent screen.
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth Callback
 *     description: >
 *       OAuth callback endpoint used by Google to redirect users after authentication.
 *       On success, initializes the user session and returns the authenticated user info.
 *       On failure, redirects to the root `/`.
 *     responses:
 *       200:
 *         description: Successful authentication and session initialization.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error during authentication callback.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
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
