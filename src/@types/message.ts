import { AppStatusCode } from "./status-code.js";

export type Message = {
    text: string;
    severity: 'error' | 'warning' | 'info' | 'success';
};

export type ApiMessageResponse = {
    messages: Message[],
    code?: AppStatusCode;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - text
 *         - severity
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
 *       required:
 *         - messages
 *       properties:
 *         code:
 *           $ref: '#/components/schemas/StatusCode'
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 */