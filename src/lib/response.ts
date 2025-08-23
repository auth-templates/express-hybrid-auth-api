import { AppStatusCode } from '@/@types/status-code.js';
import { ApiMessageResponse, Message } from '../@types/message.js';

interface ExtendedApiMessageResponse extends ApiMessageResponse {
	code?: AppStatusCode;
}

/**
 * Creates a standardized API response containing one or more messages, with an optional app-specific response code.
 *
 * This function wraps one or more message strings into an `ApiMessageResponse` structure. All messages
 * will share the same severity level. An optional `code` allows the frontend to handle responses programmatically
 * (e.g., redirect, show custom UI with links).
 *
 * @param text - A single message string or an array of strings to display to the user.
 * @param severity - The severity level of the message(s). Defaults to `'info'`.
 *                   Valid values are `'error'`, `'warning'`, `'info'`, and `'success'`.
 * @param code - Optional application-specific response code (e.g., `EMAIL_VERIFICATION_REQUIRED`).
 *
 * @returns An `ApiMessageResponse` object with one or more messages, and an optional app code.
 *
 * @example
 * ```ts
 * createMessageResponse("Profile updated", "success");
 *
 * // Returns:
 * // {
 * //   messages: [
 * //     { text: "Profile updated", severity: "success" }
 * //   ]
 * // }
 *
 * createMessageResponse([Invalid email or password. Please try again.], "error", AppStatusCode.INVALID_CREDENTIALS);
 *
 * // Returns:
 * // {
 * //   messages: [
 * //     { text: "Invalid email or password. Please try again.", severity: "error" },
 * //   ],
 * //   code: "INVALID_CREDENTIALS"
 * // }
 * ```
 */
export function createMessageResponse(
	text: string | string[],
	severity: Message['severity'] = 'info',
	code?: AppStatusCode
): ExtendedApiMessageResponse {
	const messages: Message[] = Array.isArray(text) ? text.map((t) => ({ text: t, severity })) : [{ text, severity }];

	return code ? { messages, code } : { messages };
}
