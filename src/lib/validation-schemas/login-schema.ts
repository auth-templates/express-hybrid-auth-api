import * as v from 'valibot';
import { CreateUserInput } from '../../models/user';
import { ValidationIssue } from './validation-issue';
import { passwordValidationSchema } from './signup-schema';

export const createLoginSchema = () => {
  return v.object({
    email: v.pipe(v.string(), v.email('validation.email')),
    password: passwordValidationSchema(),
  });
};

export const validateLoginData = (data: CreateUserInput): ValidationIssue[] => {
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