import express from 'express';
import {
	login,
	logout,
	signup,
	verifySignup,
	refresh,
	resetPassword,
	confirmResetPassword,
	acceptTerms,
	verifyLogin2FA,
	getSession,
	resendActivationEmail,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

/**
 * @swagger
 *  components:
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
 * /auth/signup:
 *   parameters:
 *      - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: User Signup
 *     description: Registers a new user and saves them to the database with admin role.
 *     security: []
 *     tags:
 *      - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       204:
 *         description: User successfully registered.
 *       400:
 *         description: One or more fields contain invalid input values.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               MultipleInputValidationErrors:
 *                 summary: Multiple input validation errors
 *                 value:
 *                   messages:
 *                     - text: Password must contain at least one digit
 *                       severity: error
 *                     - text: Password must contain at least one special character
 *                       severity: error
 *               SingleInputValidationError:
 *                 summary: Single input validation errors
 *                 value:
 *                   messages:
 *                     - text: Password must contain at least one special character
 *                       severity: error
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/signup', signup);

/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyTokenRequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           example: "signup-verification-token-here"
 * /auth/verify-signup:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Verify Signup Token
 *     description: Verifies a user's signup token and activates their account.
 *     security: []
 *     tags:
 *      - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyTokenRequest'
 *     responses:
 *       204:
 *         description: Token verified and user activated.
 *       400:
 *         description: One or more fields contain invalid input values.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               TwoFaSignupTokenInvalid:
 *                 summary: Signup verification token is invalid
 *                 value:
 *                   messages:
 *                     - text: The verification link is invalid or no longer available. Please check the link or request a new one.
 *                       severity: error
 *                   code: SIGNUP_TOKEN_INVALID
 *               TwoFaSignupTokenExpired:
 *                 summary: Signup verification token is expired
 *                 value:
 *                   messages:
 *                     - text: Your verification link has expired. Please request a new one to continue.
 *                       severity: error
 *                   code: SIGNUP_TOKEN_EXPIRED
 *               TwoFaSignupTokenAlreadyUsed:
 *                 summary: Signup verification token already used
 *                 value:
 *                   messages:
 *                     - text: This verification link has already been used. If you haven’t completed your signup, request a new link.
 *                       severity: error
 *                   code: SIGNUP_TOKEN_ALREADY_USED
 *       401:
 *         description: When user is not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: "Activation failed. Please contact support if the issue persists."
 *                   severity: "error"
 *               code: VERIFICATION_FAILED
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/verify-signup', verifySignup);

/**
 * @swagger
 * components:
 *   schemas:
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
 * /auth/login:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: User Login
 *     description: Generates a session token for the user and sets it in an HTTP-only cookie.
 *     security: []
 *     tags:
 *      - Authentication
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
 *             description: |
 *               Multiple HTTP-only cookies set for session and authentication:
 *               - `connect.sid`: Express session ID (server-side session store)
 *               - `access_token`: Short-lived JWT for frontend access control
 *               - `refresh_token`: Token to renew access token via /auth/token endpoint
 *             schema:
 *               type: string
 *             examples:
 *               connectSid:
 *                 value: connect.sid=s%3Aabc123; HttpOnly; Secure; Path=/; Max-Age=3600
 *               accessToken:
 *                 value: access_token=eyJhbGci...; HttpOnly; Secure; Path=/; Max-Age=900
 *               refreshToken:
 *                 value: refresh_token=def456; HttpOnly; Secure; Path=/; Max-Age=604800
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation errors in login data.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: "Password must contain at least one uppercase letter"
 *                   severity: "error"
 *       401:
 *         description: Incorrect email or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: "Incorrect email or password."
 *                   severity: "error"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/login', login);

/**
 * @swagger
 * components:
 *   schemas:
 *     ResendActivationEmailRequest:
 *       type: object
 *       required:
 *         - userEmail
 *       properties:
 *         userEmail:
 *           type: string
 *           format: email
 *           example: user@example.com
 * /auth/resend-activation-email:
 *  parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *  post:
 *    summary: Resend account activation email
 *    description: >
 *      Resends an account activation email to the provided email address if the user has not yet verified it.
 *      For security reasons, this endpoint returns a generic response regardless of the user's account state.
 *    security: []
 *    tags:
 *      - Authentication
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ResendActivationEmailRequest'
 *    responses:
 *      200:
 *        description: Confirmation email was resent (or not needed).
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessageResponse'
 *            example:
 *              messages:
 *                - text: If your email still needs to be verified, a confirmation link has been sent.
 *                  severity: info
 *      400:
 *        description: Bad request (e.g. invalid email format)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessageResponse'
 *            example:
 *              messages:
 *                - text: Invalid email address
 *                  severity: error
 *      401:
 *        description: When user is not found in database
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessageResponse'
 *            example:
 *              messages:
 *                - text: "Failed to send the verification email. Please try again later or contact support."
 *                  severity: "error"
 *              code: EMAIL_VERIFICATION_SEND_FAILED
 *      500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.post('/resend-activation-email', resendActivationEmail);

/**
 * @swagger
 * /auth/logout:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: User Logout
 *     description: Logs out the user by deleting the session cookie.
 *     tags:
 *      - Authentication
 *     responses:
 *       204:
 *         description: Logout successful, session cookie deleted.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedErrors'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/logout', authenticate, logout);

/**
 * @swagger
 * /auth/refresh:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Refresh Access Token
 *     description: Refreshes the access token using a valid refresh token stored in cookies. Requires authentication.
 *     security:
 *       - SessionCookieAuth: []
 *         RefreshTokenCookieAuth: []
 *     tags:
 *      - Authentication
 *     responses:
 *       204:
 *         description: Access token refreshed successfully. No content returned.
 *       401:
 *        description: Authentication error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ApiMessageResponse'
 *            example:
 *               messages:
 *               - text: Session invalid or expired
 *                 severity: error
 *               code: SESSION_INVALID_OR_EXPIRED
 *       403:
 *         description: Invalid or missing refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: An unexpected error occurred. Please retry to log in.
 *                   severity: "error"
 *               code: REFRESH_TOKEN_INVALID
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/refresh', authenticate, refresh);

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPasswordRequest:
 *        type: object
 *        required:
 *          - userEmail
 *        properties:
 *          userEmail:
 *            type: string
 *            example: "user@example.com"
 * /auth/reset-password/request:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Initiate Password Reset
 *     description: Sends a password reset email to the given email address. Always responds with 204 to avoid revealing user existence.
 *     security: []
 *     tags:
 *      - Authentication
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
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: "Password reset could not be initiated. Please contact support if the issue persists."
 *                   severity: "error"
 *               code: PASSWORD_RESET_NOT_INITIATED
 *       400:
 *         description: Bad request (e.g. invalid email format)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: Invalid email address
 *                   severity: error
 *       401:
 *         description: When user is not found in database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: Failed to send the password reset verification email. Please try again later or contact support.
 *                   severity: error
 *               code: EMAIL_PASSWORD_RESET_SEND_FAILED
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/reset-password/request', resetPassword);

/**
 * @swagger
 * components:
 *   schemas:
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
 * /auth/reset-password:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Complete Password Reset
 *     description: Resets the user's password using a valid reset token and a new password.
 *     security: []
 *     tags:
 *      - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset not allowed (e.g., user inactive).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: "Password reset could not be initiated. Please contact support if the issue persists."
 *                   severity: "error"
 *               code: PASSWORD_RESET_NOT_INITIATED
 *       204:
 *         description: Password successfully reset.
 *       400:
 *         description: One or more fields contain invalid input values.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               MultipleInputValidationErrors:
 *                 summary: Multiple input validation errors
 *                 value:
 *                   messages:
 *                     - text: Password must contain at least one digit
 *                       severity: error
 *                     - text: Password must contain at least one special character
 *                       severity: error
 *               SingleInputValidationError:
 *                 summary: Single input validation errors
 *                 value:
 *                   messages:
 *                     - text: Password must contain at least one special character
 *                       severity: error
 *               PasswordResetTokenInvalid:
 *                 summary: Password reset token is invalid
 *                 value:
 *                   messages:
 *                     - text: The password reset link is invalid or no longer available. Please request a new link to reset your password.
 *                       severity: error
 *                   code: PASSWORD_RESET_TOKEN_INVALID
 *               PasswordResetTokenExpired:
 *                 summary: Password reset token is expired
 *                 value:
 *                   messages:
 *                     - text: Your password reset link has expired. Please request a new one to reset your password.
 *                       severity: error
 *                   code: PASSWORD_RESET_TOKEN_EXPIRED
 *               PasswordResetTokenAlreadyUsed:
 *                 summary: Password reset token already used
 *                 value:
 *                   messages:
 *                     - text: This password reset link has already been used. If you still need to reset your password, request a new link.
 *                       severity: error
 *                   code: PASSWORD_RESET_TOKEN_ALREADY_USED
 *       401:
 *         description: When user is not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: Failed to reset the password. Please try again later or contact support.
 *                   severity: "error"
 *               code: PASSWORD_RESET_FAILED
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/reset-password', confirmResetPassword);

/**
 * @swagger
 * /auth/accept-terms:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Accept Terms of Service
 *     description: >
 *       Marks the user's Terms of Service as accepted. Requires a valid session and refresh token.
 *       A new access token is issued with updated claims and sent via an HTTP-only cookie.
 *     tags:
 *      - Authentication
 *     responses:
 *       204:
 *         description: Terms accepted successfully. New access token set in cookie.
 *         headers:
 *           Set-Cookie:
 *             description: |
 *               Multiple HTTP-only cookies set for session and authentication:
 *               - `connect.sid`: Express session ID (server-side session store)
 *               - `access_token`: Short-lived JWT for frontend access control
 *               - `refresh_token`: Token to renew access token via /auth/token endpoint
 *             schema:
 *               type: string
 *             examples:
 *               connectSid:
 *                 value: connect.sid=s%3Aabc123; HttpOnly; Secure; Path=/; Max-Age=3600
 *               accessToken:
 *                 value: access_token=eyJhbGci...; HttpOnly; Secure; Path=/; Max-Age=900
 *               refreshToken:
 *                 value: refresh_token=def456; HttpOnly; Secure; Path=/; Max-Age=604800
 *       401:
 *         $ref: '#/components/responses/UnauthorizedErrors'
 *       403:
 *         description: Authorization errors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               InvalidOrMissingRefreshToken:
 *                 summary: Invalid or missing refresh token.
 *                 value:
 *                   messages:
 *                     - text: An unexpected error occurred. Please retry to log in.
 *                       severity: "error"
 *                   code: REFRESH_TOKEN_INVALID
 *               TermsAlreadyAccepted:
 *                 summary: Terms already accepted.
 *                 value:
 *                   messages:
 *                     - text: You have already accepted the terms and conditions.
 *                       severity: "info"
 *                   code: TERMS_ALREADY_ACCEPTED
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/accept-terms', authenticate, acceptTerms);

/**
 * @swagger
 * components:
 *   schemas:
 *     Verify2FARequest:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           example: "123456"
 * /auth/verify-2fa:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Verify Two-Factor Authentication Code
 *     description: Verifies a 2FA code provided by the user during login. Requires an active session.
 *     tags:
 *      - Authentication
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
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: "The verification code you entered is invalid. Please try again."
 *                   severity: "error"
 *               code: TWO_FA_VERIFICATION_CODE_INVALID
 *       403:
 *         description: Authorization errors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               InvalidOrMissingRefreshToken:
 *                 summary: Invalid or missing refresh token.
 *                 value:
 *                   messages:
 *                     - text: An unexpected error occurred. Please retry to log in.
 *                       severity: error
 *                   code: REFRESH_TOKEN_INVALID
 *               TwoFaVerificationNotConfigured:
 *                 summary: Two factor verification is not configured.
 *                 value:
 *                   messages:
 *                     - text: Two-factor authentication is not configured for your account.
 *                       severity: error
 *                   code: TWO_FA_NOT_CONFIGURED
 *               TwoFaVerificationNotPending:
 *                 summary: Two factor verification is not pending.
 *                 value:
 *                   messages:
 *                     - text: Two-factor authentication verification is not pending.
 *                       severity: error
 *                   code: TWO_FA_VERIFICATION_NOT_PENDING
 *       401:
 *         description: UnauthorizedErrors errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               SessionInvalidOrExpired:
 *                 $ref: '#/components/examples/SessionInvalidOrExpired'
 *               AccessTokenMissing:
 *                 $ref: '#/components/examples/AccessTokenMissing'
 *               AccessTokenExpired:
 *                 $ref: '#/components/examples/AccessTokenExpired'
 *               TwoFaVerificationFailed:
 *                 summary: When user is not found in the database
 *                 value:
 *                   messages:
 *                     - text: Two-factor authentication failed. Please try again or contact support.
 *                       severity: "error"
 *                   code: TWO_FA_VERIFICATION_FAILED
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/verify-2fa', authenticate, verifyLogin2FA);

/**
 * @swagger
 * /auth/session:
 *   get:
 *     summary: Get current user session
 *     description: Returns the authenticated user's session information. Requires an active session.
 *     tags:
 *      - Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user session retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: User not found.
 *                   severity: "error"
 *               code: USER_NOT_FOUND
 *       401:
 *         $ref: '#/components/responses/UnauthorizedErrors'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/session', authenticate, getSession);

export default router;
