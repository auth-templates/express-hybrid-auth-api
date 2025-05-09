import express from 'express';
import { setup2FA, verify2FASetup, disable2FA, recover2FA, confirm2FARecover } from '../controllers/2faController';

const router = express.Router();

/**
 * @swagger
 * /2fa/setup:
 *   post:
 *     summary: Generates QR code and temporary secret for 2FA setup
 *     description: Initiates the 2FA setup process by generating a QR code and a temporary secret for a TOTP app like Google Authenticator.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA setup information returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qrCodeUrl:
 *                   type: string
 *                   format: uri
 *                   example: "otpauth://totp/MyApp:username@example.com?secret=ABCDEF123456&issuer=MyApp"
 *                 secret:
 *                   type: string
 *                   example: "ABCDEF123456"
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post('/setup', setup2FA);

/**
 * @swagger
 * /2fa/verify-setup:
 *   post:
 *     summary: Verifies the 2FA setup code
 *     description: Verifies the TOTP code to confirm 2FA setup with an authenticator app.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Verification successful, 2FA enabled
 *       400:
 *         description: Invalid code
 *       401:
 *         description: Unauthorized
 */
router.post('/verify-setup', verify2FASetup);

/**
 * @swagger
 * /2fa/disable:
 *   delete:
 *     summary: Disables 2FA
 *     description: Disables two-factor authentication for the current user and deletes the 2FA secret from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA disabled successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.delete('/disable', disable2FA);

/**
 * @swagger
 * /2fa/recover:
 *   post:
 *     summary: Request email-based 2FA reset
 *     description: Requests a recovery process for users who are locked out due to losing access to their 2FA device (phone).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: 2FA reset request sent successfully
 *       400:
 *         description: Invalid email or failed request
 *       404:
 *         description: User not found
 */
router.post('/recover', recover2FA);

/**
 * @swagger
 * /2fa/confirm-recover:
 *   post:
 *     summary: Confirm 2FA reset
 *     description: Confirms the reset process for 2FA by verifying the token sent to the user's email.
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
 *                 example: "abc123def456"
 *     responses:
 *       200:
 *         description: 2FA successfully disabled and reset
 *       400:
 *         description: Invalid token
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post('/confirm-recover', confirm2FARecover);

export default router;
