import { z } from 'zod';
import { TFunction } from 'i18next';

export const createSignupSchema = (t: TFunction) => {
  const commonString = (min: number, max: number) =>
    z.string()
      .min(min, t('validation.min', { min }))
      .max(max, t('validation.max', { max }));

  const reservedUsernames = ['admin', 'root', 'system', 'test', 'support', 'me'];

  const usernameSchema = commonString(3, 30)
    .regex(/^[a-zA-Z0-9._]+$/, t('validation.username.invalid'))
    .refine((val) => !reservedUsernames.includes(val.toLowerCase()), {
      message: t('validation.username.reserved'),
    });

  return z.object({
    firstName: commonString(3, 30),
    lastName: commonString(3, 30),
    username: usernameSchema,
    email: z.string().email(t('validation.email')),
    password: z.string()
      .min(8, t('validation.min', { min: 8 }))
      .max(100, t('validation.max', { max: 100 })),
  });
};
