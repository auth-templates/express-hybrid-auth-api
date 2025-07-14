import express from 'express';
import {
  setup2FA,
  verify2FASetup,
  disable2FA,
  recover2FA,
  confirm2FARecover
} from '../controllers/2faController';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Two-factor authentication enabled successfully."
 *         severity:
 *           type: string
 *           enum: [error, warning, info, success]
 *           example: success
 *     ApiMessageResponse:
 *       type: object
 *       properties:
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *     TwoFASetupResponse:
 *       type: object
 *       properties:
 *         qrCodeUrl:
 *           type: string
 *           format: uri
 *           example: "otpauth://totp/MyApp:username@example.com?secret=ABCDEF123456&issuer=MyApp"
 *         secret:
 *           type: string
 *           example: "ABCDEF123456"
 *     Verify2FACodeRequest:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           example: "123456"
 *     Recover2FARequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: "user@example.com"
 *     ConfirmRecover2FARequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           example: "abc123def456"
 */

/**
 * @swagger
 * /2fa/setup:
 *   post:
 *     summary: Initialize 2FA Setup
 *     description: Generates a QR code and a temporary secret to start the two-factor authentication setup process.
 *     tags:
 *      - Two Factor Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA setup initialized with QR code and secret.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TwoFASetupResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 */
router.post('/setup', authenticate, setup2FA);

/**
 * @swagger
 * /2fa/verify-setup:
 *   post:
 *     summary: Verify 2FA Setup Code
 *     description: Verifies the TOTP code to confirm two-factor authentication setup.
 *     tags:
 *      - Two Factor Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Verify2FACodeRequest'
 *     responses:
 *       200:
 *         description: Two-factor authentication enabled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       400:
 *         description: Invalid two-factor authentication code.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 */
router.post('/verify-setup', authenticate, verify2FASetup);

/**
 * @swagger
 * /2fa/disable:
 *   delete:
 *     summary: Disable Two-Factor Authentication
 *     description: Disables 2FA for the current user and removes the 2FA secret.
 *     tags:
 *      - Two Factor Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Two-factor authentication disabled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       400:
 *         description: Failed to disable two-factor authentication.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 */
router.delete('/disable', authenticate, disable2FA);

/**
 * @swagger
 * /2fa/recover:
 *   post:
 *     summary: Request 2FA Recovery
 *     description: Sends a recovery email to users who lost access to their 2FA device.
 *     tags:
 *      - Two Factor Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recover2FARequest'
 *     responses:
 *       200:
 *         description: Recovery email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       400:
 *         description: Invalid email or request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 */
router.post('/recover', recover2FA);

/**
 * @swagger
 * /2fa/confirm-recover:
 *   post:
 *     summary: Confirm 2FA Recovery
 *     description: Confirms 2FA reset by verifying the recovery token sent via email.
 *     tags:
 *      - Two Factor Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmRecover2FARequest'
 *     responses:
 *       200:
 *         description: Two-factor authentication recovery confirmed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       400:
 *         description: Invalid or expired recovery token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 */
router.post('/confirm-recover', confirm2FARecover);

export default router;
