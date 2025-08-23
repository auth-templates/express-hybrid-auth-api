import * as v from 'valibot';
import { UserCredentials } from '../../models/user.js';
import { ValidationIssue } from './validation-issue.js';

export const createEmailValidationSchema = () => {
	return v.object({
		email: v.pipe(v.string(), v.email('validation.email')),
	});
};

export const validateEmail = (data: { email: string }): ValidationIssue[] => {
	try {
		v.parse(createEmailValidationSchema(), data);
		return [];
	} catch (error: any) {
		const issues = [{ message: 'validation.email' }];

		return issues;
	}
};
