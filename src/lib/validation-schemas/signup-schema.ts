import * as v from 'valibot';
import { ValibotIssueReason } from '../valibot-issue-reason';
import { CreateUserInput, Role } from '../../models/user';
import { ValidationIssue } from './validation-issue';

const commonString = (min: number, max: number, fieldName: string) => v.pipe(
    v.string(), 
    v.minLength(min, `validation.${fieldName}.min`), 
    v.maxLength(max, `validation.${fieldName}.max`)
);

export const passwordValidationSchema = () => v.pipe(
    v.string(),
    v.minLength(8, 'validation.password.minLength'), // Minimum length of 8
    v.maxLength(100, 'validation.password.maxLength'), // Maximum length of 100
    v.regex(/[A-Z]/, 'validation.password.uppercase'), // At least one uppercase letter
    v.regex(/[a-z]/, 'validation.password.lowercase'), // At least one lowercase letter
    v.regex(/\d/, 'validation.password.digit'), // At least one digit
    v.regex(/[^A-Za-z0-9]/, 'validation.password.special') // At least one special character
);

export const createSignupSchema = () => {
  return v.object({
    firstName: commonString(1, 30, 'firstname'),
    lastName: commonString(1, 30, 'lastname'),
    email: v.pipe(v.string(), v.email('validation.email')),
    password: passwordValidationSchema(),
    role: v.enum(Role),
  });
};

export const validateSignupData = (data: CreateUserInput): ValidationIssue[] => {
    try {
        v.parse(createSignupSchema(), data);
        return [];   
    } catch (error) {
        const issues = error.issues.map((x: any) => {
            if ( x.type === ValibotIssueReason.MinLength || x.type === ValibotIssueReason.MaxLength ) {
                return { message: x.message, items: { count: x.requirement } }; 
            } else {
                return { message: x.message }
            }
        });
        return issues;
    }
}