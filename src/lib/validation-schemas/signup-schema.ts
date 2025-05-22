import * as v from 'valibot';
import { ValibotIssueReason } from '../valibot-issue-reason';
import { CreateUserInput, Role } from '../../models/user';
import { ValidationIssue } from './validation-issue';
import { passwordValidationSchema } from './password-schema';

const commonString = (min: number, max: number, fieldName: string) => v.pipe(
    v.string(), 
    v.minLength(min, `validation.${fieldName}.min`), 
    v.maxLength(max, `validation.${fieldName}.max`)
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