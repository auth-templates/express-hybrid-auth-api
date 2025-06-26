import express from 'express';

import { login, logout, signup, verifySignup, refresh, resetPassword, confirmResetPassword, acceptTerms, verifyLogin2FA } from '../controllers/authController';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - termsAccepted
 *       properties:
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           example: "$SuperSecurePassword123"
 *         termsAccepted:
 *           type: boolean
 *           example: true
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "dev@mail.com"
 *         password:
 *           type: string
 *           example: "$SuperSecurePassword45"
 *     Verify2FARequest:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           example: "123456"  
 *     VerifyTokenRequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           example: "signup-verification-token-here"
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - userEmail
 *       properties:
 *         userEmail:
 *           type: string
 *           example: "user@example.com"
 *     ConfirmResetPasswordRequest:
 *       type: object
 *       required:
 *         - token
 *         - newPassword
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         newPassword:
 *           type: string
 *           example: "StrongNewPassword!2025"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Internal server error"
 *         error:
 *           type: string
 *     ValidationErrorItem:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Invalid email format"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         role:
 *           type: string
 *           example: "admin"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T12:00:00Z"
 *         enabled2FA:
 *           type: boolean
 *           nullable: true
 *           example: true
 *         status:
 *           type: string
 *           nullable: true
 *           example: "active"
 */

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
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       200:
 *         description: User successfully registered.
 *       500:
 *         description: Server error during signup.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *             $ref: '#/components/schemas/VerifyTokenRequest'
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
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful, session token set in cookie and user info returned.
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only session cookie containing the session token.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation errors in login data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValidationErrorItem'
 *       500:
 *         description: Server error during login.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User Logout
 *     description: Logs out the user by deleting the session cookie.
 *     responses:
 *       204:
 *         description: Logout successful, session cookie deleted.
 *       500:
 *         description: Server error during logout.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/logout', authenticate, logout);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh Access Token
 *     description: Refreshes the access token using a valid refresh token stored in cookies. Requires authentication.
 *     responses:
 *       204:
 *         description: Access token refreshed successfully. No content returned.
 *       403:
 *         description: Invalid or missing refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error during token refresh.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/refresh', authenticate, refresh);

/**
 * @swagger
 * /auth/reset-password/request:
 *   post:
 *     summary: Initiate Password Reset
 *     description: Sends a password reset email to the given email address. Always responds with 204 to avoid revealing user existence.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       204:
 *         description: Password reset email sent if user exists and is active.
 *       200:
 *         description: Password reset not allowed (e.g., user inactive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset not allowed
 *       500:
 *         description: Server error during password reset.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/reset-password/request', resetPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Complete Password Reset
 *     description: Resets the user's password using a valid reset token and a new password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmResetPasswordRequest'
 *     responses:
 *       204:
 *         description: Password successfully reset.
 *       400:
 *         description: Invalid or expired token, or invalid password format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error during password reset.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/reset-password', confirmResetPassword);


/**
 * @swagger
 * /auth/accept-terms:
 *   post:
 *     summary: Accept Terms of Service
 *     description: >-
 *       Marks the user's Terms of Service as accepted. Requires a valid session and refresh token.
 *       A new access token is issued with updated claims and sent via an HTTP-only cookie.
 *     responses:
 *       '204':
 *         description: Terms accepted successfully. New access token set in cookie.
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie containing a new access token.
 *             schema:
 *               type: string
 *       '401':
 *         description: Unauthorized - session missing or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Invalid or missing refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server error during terms acceptance or token generation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/accept-terms', authenticate, acceptTerms);

/**
 * @swagger
 * /auth/verify-2fa:
 *   post:
 *     summary: Verify Two-Factor Authentication Code
 *     description: Verifies a 2FA code provided by the user during login. Requires an active session.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Verify2FARequest'
 *     responses:
 *       200:
 *         description: 2FA verification successful. Session updated and access token issued.
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie containing the access token.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid or expired 2FA code.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - session missing or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error during 2FA verification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post('/verify-2fa', authenticate, verifyLogin2FA);

export default router;