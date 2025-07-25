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
 * /2fa/setup:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
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
 *         $ref: '#/components/responses/UnauthorizedErrors'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/setup', authenticate, setup2FA);

/**
 * @swagger
 * components:
 *   schemas:
 *     Verify2FACodeRequest:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           example: "123456"
 * /2fa/verify-setup:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Verify 2FA Setup Code
 *     description: Verifies the TOTP code to confirm two-factor authentication setup.
 *     tags:
 *      - Two Factor Authentication
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
 *             example:
 *               messages:
 *                 - text: Two-factor authentication has been successfully verified.
 *                   severity: info
 *               code: TWO_FA_SETUP_SUCCESS
 *       400:
 *         description: Invalid two-factor authentication code.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               TwoFaFormatError:
 *                 summary: The 2FA code format is not valid
 *                 value:
 *                   messages:
 *                     - text: The 2FA code must be a 6-digit number.
 *                       severity: error
 *               TwoFaSetupError:
 *                 summary: The 2FA setup is expired or no longer valid
 *                 value:
 *                   messages:
 *                     - text: Your 2FA setup has expired or is no longer valid. Please try setting it up again.
 *                       severity: error
 *                   code: TWO_FA_SETUP_INVALID
 *               TwoFaVerificationCodeInvalid:
 *                 summary: The 2FA code is invalid
 *                 value:
 *                   messages:
 *                     - text: The verification code you entered is invalid. Please try again.
 *                       severity: error
 *                   code: TWO_FA_VERIFICATION_CODE_INVALID     
 *       401:
 *         $ref: '#/components/responses/UnauthorizedErrors'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/verify-setup', authenticate, verify2FASetup);

/**
 * @swagger
 * /2fa/disable:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   delete:
 *     summary: Disable Two-Factor Authentication
 *     description: Disables 2FA for the current user and removes the 2FA secret.
 *     tags:
 *      - Two Factor Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Two-factor authentication disabled successfully.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedErrors'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/disable', authenticate, disable2FA);

/**
 * @swagger
 * components:
 *   schemas:
 *     Recover2FARequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: "user@example.com"
 * /2fa/recover:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Request 2FA Recovery
 *     description: Sends a recovery email to users who lost access to their 2FA device.
 *     security: []
 *     tags:
 *      - Two Factor Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recover2FARequest'
 *     responses:
 *       204:
 *         description: Recovery email sent successfully.
 *       200:
 *         description: Two Factor Recovery email was sent or not depending on the user's state.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: Two-step verification recovery could not be initiated. Please contact support if the issue persists.
 *                   severity: error
 *               code: TWO_FA_RECOVERY_NOT_INITIATED
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
 *                 - text: Failed to send the two-factor authentication recovery email. Please try again later or contact support.
 *                   severity: error
 *               code: EMAIL_TWO_FA_RECOVERY_SEND_FAILED
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/recover', recover2FA);

/**
 * @swagger
 * components:
 *   schemas:
 *     ConfirmRecover2FARequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           example: "abc123def456"
 * /2fa/confirm-recover:
 *   parameters:
 *     - $ref: '#/components/parameters/XCsrfTokenHeader'
 *   post:
 *     summary: Confirm 2FA Recovery
 *     description: Confirms 2FA reset by verifying the recovery token sent via email.
 *     security: []
 *     tags:
 *      - Two Factor Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmRecover2FARequest'
 *     responses:
 *       204:
 *         description: Two-factor authentication recovery confirmed.
 *       400: 
 *         description: One or more fields contain invalid input values.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             examples:
 *               TwoFaRecoveryTokenInvalid: 
 *                 summary: Two-factor recover token is invalid
 *                 value:
 *                   messages:
 *                     - text: The verification link is invalid or no longer available. Please check the link or request a new one.
 *                       severity: error
 *                   code: TWO_FA_RECOVERY_TOKEN_INVALID
 *               TwoFaRecoveryTokenExpired: 
 *                 summary: Two-factor recover token is expired
 *                 value: 
 *                   messages: 
 *                     - text: Your verification link has expired. Please request a new one to continue.
 *                       severity: error
 *                   code: TWO_FA_RECOVERY_TOKEN_EXPIRED
 *               TwoFaRecoveryTokenAlreadyUsed:
 *                 summary: Two-factor recover token is already used
 *                 value:
 *                   messages:
 *                     - text: This verification link has already been used. If you haven’t completed your signup, request a new link.
 *                       severity: error
 *                   code: TWO_FA_RECOVERY_TOKEN_ALREADY_USED
 *       401:
 *         description: When user is not found in database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMessageResponse'
 *             example:
 *               messages:
 *                 - text: Two-factor authentication recovery failed. Please try again later or contact support.
 *                   severity: "error"
 *               code: PASSWORD_RESET_FAILED
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/confirm-recover', confirm2FARecover);

export default router;
