import { render } from '@react-email/components';
import VerificationEmail from '../../emails/templates/verification-email'
import nodemailer from 'nodemailer';
import AccountActivationEmail from '../../emails/templates/account-activation-email';
import TwoFactorAuthEmail from '../../emails/templates/2fa-code-email';
import TwoFactorDisabledEmail from '../../emails/templates/2fa-disabled-email';

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

export async function send2FARecoverEmail({verificationCode, userEmail, expiresInMinutes, t}:{verificationCode: string, userEmail: string, expiresInMinutes: number, t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <TwoFactorAuthEmail 
            expiresInMinutes={expiresInMinutes}
            verificationCode={verificationCode}
            t={t}
        />
    );

    const options = {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'Account activated',
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}


export async function send2FADisabledEmail({t}:{t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <TwoFactorDisabledEmail
            t={t}
        />
    );

    const options = {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'Account activated',
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}