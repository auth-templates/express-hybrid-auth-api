import { ApiMessageResponse, Message } from "../@types/message";

/**
 * Creates a standardized API response containing one or more messages.
 *
 * Accepts a single message or an array of messages, and wraps them into
 * an `ApiMessageResponse` structure. All messages will share the same severity level.
 *
 * @param text - A single message string or an array of strings to display to the user.
 * @param severity - The severity level of the message(s). Defaults to `'info'`.
 *                   Valid values are `'error'`, `'warning'`, `'info'`, and `'success'`.
 *
 * @returns An `ApiMessageResponse` object with one or more messages.
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
 * createMessageResponse(["Email required", "Password too short"], "error");
 *
 * // Returns:
 * // {
 * //   messages: [
 * //     { text: "Email required", severity: "error" },
 * //     { text: "Password too short", severity: "error" }
 * //   ]
 * // }
 * ```
 */
export function createMessageResponse(
    text: string | string[],
    severity: Message['severity'] = 'info'
): ApiMessageResponse {
    const messages: Message[] = Array.isArray(text)
        ? text.map((t) => ({ text: t, severity }))
        : [{ text, severity }];

    return { messages };
}
