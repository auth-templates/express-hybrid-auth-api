import express from 'express';

import { login, logout, signup, verifySignup, refresh } from '../controllers/authController';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Registers a new user and saves them to the database with admin role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "$SuperSecurePassword123"
 *     responses:
 *       200:
 *         description: User successfully registered.
 *       500:
 *         description: Server error during signup.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error retrieving items
 *                 error:
 *                   type: string
 */
router.post('/signup', signup);

/**
 * @swagger
 * /auth/verify-signup:
 *   post:
 *     summary: Verify Signup Token
 *     description: Verifies a user's signup token and activates their account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "signup-verification-token-here"
 *     responses:
 *       200:
 *         description: Token verified and user activated.
 *       400:
 *         description: Invalid or expired token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error during verification.
 */
router.post('/verify-signup', verifySignup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Generates a session token for the user and sets it in an HTTP-only cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "dev@mail.com"
 *               password:
 *                 type: string
 *                 example: "$SuperSecurePassword45"
 *     responses:
 *       200:
 *         description: Login successful, session token set in cookie.
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only session cookie containing the session token.
 *             schema:
 *               type: string
 *       500:
 *         description: Server error during login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error retrieving items
 *                 error:
 *                   type: string
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User Logout
 *     description: Logs out the user by deleting the session cookie.
 *     responses:
 *       '204':
 *         description: Logout successful, session cookie deleted.
 *       '500':
 *         description: Server error during logout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error retrieving items
 *                 error:
 *                   type: string
*/
router.post('/logout', authenticate, logout);

router.post('/refresh', authenticate, refresh);

export default router;