import { render } from '@react-email/components';
import VerificationEmail from '../../emails/templates/verification-email'
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 2525,
  secure: false, // smtp4dev does not use TLS by default
  auth: undefined,
//   auth: {
//     user: '', // Leave empty for smtp4dev (no auth by default)
//     pass: '',
//   },
});

export async function sendVerificationEmail({t}:{t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <VerificationEmail verificationUrl="https://yourdomain.com/verify?token=abc123" t={t}/>
    );

    const options = {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'hello world',
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}
