import { Router } from 'express';
import { csrfTokenHandler } from '../middlewares/csrf';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CsrfTokenResponse:
 *       type: object
 *       properties:
 *         csrfToken:
 *           type: string
 *           example: "abc123csrfTOKEN456xyz"
 */

/**
 * @swagger
 * /csrf-token:
 *   get:
 *     summary: Get CSRF token
 *     tags:
 *       - Security
 *     description: |
 *       Returns a CSRF token and sets a cookie named `XSRF-TOKEN`.<br>
 *       Include the returned token in the `x-csrf-token` header of all write (POST, PUT, PATCH, DELETE) requests.<br>
 *       This protects against Cross-Site Request Forgery attacks by validating state-changing requests.
 *     responses:
 *       200:
 *         description: CSRF token returned successfully.
 *         headers:
 *           Set-Cookie:
 *             description: Cookie named `XSRF-TOKEN` containing the token.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CsrfTokenResponse'
 */
router.get('/csrf-token', csrfTokenHandler);

export default router;
