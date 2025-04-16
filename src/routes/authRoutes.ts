import express from 'express';

import { login, logout, signup } from '../controllers/authController';

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
 *               - username
 *               - emailAddress
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               emailAddress:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "SuperSecurePassword123"
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
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
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
router.post('/logout', logout);


export default router;