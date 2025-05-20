import * as v from 'valibot';
import { ValidationIssue } from './validation-issue';

export const createVerify2FASchema = () => {
  return v.object({
    code: v.pipe(
      v.string(),
      v.minLength(6, 'errors.invalid_2fa_code'),
      v.maxLength(6, 'errors.invalid_2fa_code'),
      v.regex(/^\d{6}$/, 'errors.invalid_2fa_code')
    ),
  });
};

export const validate2FAData = (data: any): ValidationIssue[] => {
  try {
    v.parse(createVerify2FASchema(), data);
    return [];
  } catch (error) {
    const issues = error.issues.map(() => {
      return { message: 'errors.invalid_2fa_code' };
    });
    return issues;
  }
};
