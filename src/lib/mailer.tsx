import { render } from '@react-email/components';
import VerificationEmail from '../../emails/templates/verification-email'
import nodemailer from 'nodemailer';
import AccountActivationEmail from '../../emails/templates/account-activation-email';

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

export async function sendVerificationEmail({token, t}:{token: string, t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <VerificationEmail verificationUrl={`https://yourdomain.com/verify?token=${token}`} t={t}/>
    );

    const options = {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'Email verification',
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}

export async function sendAccountActivationEmail({t}:{t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <AccountActivationEmail loginUrl={`https://yourdomain.com/login`} t={t}/>
    );

    const options = {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'Account activated',
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}



