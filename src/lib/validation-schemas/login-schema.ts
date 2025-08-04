import * as v from 'valibot';
import { UserCredentials } from '../../models/user.js';
import { ValidationIssue } from './validation-issue.js';
import { passwordValidationSchema } from './password-schema.js';

export const createLoginSchema = () => {
  return v.object({
    email: v.pipe(v.string(), v.email('validation.email')),
    password: passwordValidationSchema(),
  });
};

export const validateLoginData = (data: UserCredentials): ValidationIssue[] => {
    try {
        v.parse(createLoginSchema(), data);
        return [];   
    } catch (error) {
        const issues = error.issues.map((x: any) => {
            if ( x.message === 'validation.email' ) {
                return { message: 'validation.email' }; 
            } else {
                return { message: 'errors.invalid_credentials' }
            }
        });
        return issues;
    }
}