import * as v from 'valibot';

const commonString = (min: number, max: number) => v.pipe(
    v.string(), 
    v.minLength(min, 'validation.min'), 
    v.maxLength(max, 'validation.max')
);

export const passwordValidationSchema = () => v.pipe(
    v.string(),
    v.minLength(8, 'validation.password.minLength'), // Minimum length of 8
    v.maxLength(100, 'validation.password.maxLength'), // Maximum length of 100
    v.regex(/[A-Z]/, 'validation.password.uppercase'), // At least one uppercase letter
    v.regex(/[a-z]/, 'validation.password.lowercase'), // At least one lowercase letter
    v.regex(/\d/, 'validation.password.digit'), // At least one digit
    v.regex(/[@$!%*?&]/, 'validation.password.special'), // At least one special character
);

export const createSignupSchema = () => {
  return v.object({
    firstName: commonString(3, 30),
    lastName: commonString(3, 30),
    email: v.pipe(v.string(), v.email('validation.email')),
    password: passwordValidationSchema()
  });
};

export const validateSignupData = (data: any) => {
    try {
        console.log("data:", data);
        v.parse(createSignupSchema(), data);   
    } catch (error) {
        console.log("here", error);
        //TO DO: throw the correct AppError error with translationKey and items
        throw JSON.stringify(error, null, 2);
    }
}