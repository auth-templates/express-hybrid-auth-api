import { AppStatusCode } from '@/@types/status-code.js';

export class AppError extends Error {
	translationKey: string;
	params?: Record<string, unknown>;
	code: AppStatusCode;
	httpStatusCode: number;

	constructor(translationKey: string, params = {}, code: AppStatusCode, httpStatusCode = 400) {
		super(translationKey);
		this.translationKey = translationKey;
		this.params = params;
		this.httpStatusCode = httpStatusCode;
		this.code = code;
	}
}
