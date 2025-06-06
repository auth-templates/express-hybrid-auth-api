import { render } from '@react-email/components';
import VerificationEmail from '../../emails/templates/verification-email'
import nodemailer from 'nodemailer';
import AccountActivationEmail from '../../emails/templates/account-activation-email';
import TwoFactorAuthEmail from '../../emails/templates/2fa-code-email';
import TwoFactorDisabledEmail from '../../emails/templates/2fa-disabled-email';
import PasswordResetEmail from '../../emails/templates/password-reset-email';
import GlobalConfig from '../config';

export const transporter = nodemailer.createTransport({
  host: GlobalConfig.SMTP_HOST,
  port: GlobalConfig.SMTP_PORT,
  secure: false, // smtp4dev does not use TLS by default
  auth: undefined,
//   auth: {
//     user: '', // Leave empty for smtp4dev (no auth by default)
//     pass: '',
//   },
});

export async function sendVerificationEmail({token, userEmail, expiresInMinutes, t}:{token: string, userEmail: string, expiresInMinutes: number, t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <VerificationEmail 
            verificationUrl={`${GlobalConfig.EMAIL_FRONTEND_BASE_URL}/verify?token=${token}`}
            expiresInMinutes={expiresInMinutes}
            t={t} 
            frontendUrl={GlobalConfig.EMAIL_FRONTEND_BASE_URL}   
            assetsUrl={GlobalConfig.EMAIL_ASSETS_BASE_URL}       
        />
    );

    const options = {
        from: GlobalConfig.SUPPORT_EMAIL,
        to: userEmail,
        subject: t("emails.verification.subject"),
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}

export async function sendAccountActivationEmail({t, userEmail}:{userEmail: string, t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <AccountActivationEmail
            t={t}
            frontendUrl={GlobalConfig.EMAIL_FRONTEND_BASE_URL}   
            assetsUrl={GlobalConfig.EMAIL_ASSETS_BASE_URL}              
        />
    );

    const options = {
        from: GlobalConfig.SUPPORT_EMAIL,
        to: userEmail,
        subject: t('emails.account-activation-email.subject'),
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
            frontendUrl={GlobalConfig.EMAIL_FRONTEND_BASE_URL}   
            assetsUrl={GlobalConfig.EMAIL_ASSETS_BASE_URL}            
        />
    );

    const options = {
        from: GlobalConfig.SUPPORT_EMAIL,
        to: userEmail,
        subject: t("emails.2fa-code-email.subject"),
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}

export async function send2FADisabledEmail({t}:{t: (key: string, options?: any) => string}) {
    const emailHtml = await render(
        <TwoFactorDisabledEmail
            t={t} 
            frontendUrl={GlobalConfig.EMAIL_FRONTEND_BASE_URL}   
            assetsUrl={GlobalConfig.EMAIL_ASSETS_BASE_URL}              
        />
    );

    const options = {
        from: GlobalConfig.SUPPORT_EMAIL,
        to: 'user@gmail.com',
        subject: t("emails.2fa-disabled.subject"),
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}

export async function sendPasswordResetEmail({t, userEmail, expiresInMinutes, verificationCode}:{t: (key: string, options?: any) => string, userEmail: string, expiresInMinutes: number, verificationCode: string}) {
    const emailHtml = await render(
        <PasswordResetEmail
            resetUrl={`${GlobalConfig.EMAIL_FRONTEND_BASE_URL}/reset-password?token=${verificationCode}`}
            expiresInMinutes={expiresInMinutes}
            t={t} 
            frontendUrl={GlobalConfig.EMAIL_FRONTEND_BASE_URL}   
            assetsUrl={GlobalConfig.EMAIL_ASSETS_BASE_URL}            
        />
    );

    const options = {
        from: GlobalConfig.SUPPORT_EMAIL,
        to: userEmail,
        subject: t("emails.password-reset-email.subject"),
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}

export async function sendPasswordChangedEmail({t, userEmail}:{t: (key: string, options?: any) => string, userEmail: string}) {
    const emailHtml = await render(
        <PasswordResetEmail
            t={t} 
            frontendUrl={GlobalConfig.EMAIL_FRONTEND_BASE_URL}   
            assetsUrl={GlobalConfig.EMAIL_ASSETS_BASE_URL}       
        />
    );

    const options = {
        from: GlobalConfig.SUPPORT_EMAIL,
        to: userEmail,
        subject: t("emails.password-changed-email.subject"),
        html: emailHtml,
    };
    
    await transporter.sendMail(options);
}