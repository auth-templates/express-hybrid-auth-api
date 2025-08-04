import * as emailModule from '../mailer.js';
import { render } from '@react-email/render';

import GlobalConfig from '../../config.js';
import { transporter } from '../mail-transporter.js';

jest.mock('@react-email/render');
jest.mock('../mail-transporter');

describe('Email sending functions', () => {
  const mockT = jest.fn((key) => key);
  const mockRenderHtml = '<html>mock email</html>';

  beforeAll(() => {
    // Mock GlobalConfig values
    GlobalConfig.EMAIL_FRONTEND_BASE_URL = 'https://frontend.example.com';
    GlobalConfig.EMAIL_ASSETS_BASE_URL = 'https://assets.example.com';
    GlobalConfig.SUPPORT_EMAIL = 'support@example.com';
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (render as jest.Mock).mockResolvedValue(mockRenderHtml);
    (transporter.sendMail as jest.Mock).mockResolvedValue(undefined);
  });

  test('sendVerificationEmail sends email with correct options', async () => {
    const args = {
      token: 'token123',
      userEmail: 'user@example.com',
      expiresInMinutes: 10,
      t: mockT,
    };

    await emailModule.sendVerificationEmail(args);

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        verificationUrl: `${GlobalConfig.EMAIL_FRONTEND_BASE_URL}/verify?token=${args.token}`,
        expiresInMinutes: args.expiresInMinutes,
        t: args.t,
        frontendUrl: GlobalConfig.EMAIL_FRONTEND_BASE_URL,
        assetsUrl: GlobalConfig.EMAIL_ASSETS_BASE_URL,
      }),
    }));

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: GlobalConfig.SUPPORT_EMAIL,
      to: args.userEmail,
      subject: mockT("emails.verification.subject"),
      html: mockRenderHtml,
    });
  });

  test('sendAccountActivationEmail sends email with correct options', async () => {
    const args = {
      userEmail: 'user@example.com',
      t: mockT,
    };

    await emailModule.sendAccountActivationEmail(args);

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        t: args.t,
        frontendUrl: GlobalConfig.EMAIL_FRONTEND_BASE_URL,
        assetsUrl: GlobalConfig.EMAIL_ASSETS_BASE_URL,
      }),
    }));

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: GlobalConfig.SUPPORT_EMAIL,
      to: args.userEmail,
      subject: mockT('emails.account-activation-email.subject'),
      html: mockRenderHtml,
    });
  });

  test('send2FARecoverEmail sends email with correct options', async () => {
    const args = {
      verificationCode: '123456',
      userEmail: 'user@example.com',
      expiresInMinutes: 15,
      t: mockT,
    };

    await emailModule.send2FARecoverEmail(args);

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        expiresInMinutes: args.expiresInMinutes,
        verificationCode: args.verificationCode,
        t: args.t,
        frontendUrl: GlobalConfig.EMAIL_FRONTEND_BASE_URL,
        assetsUrl: GlobalConfig.EMAIL_ASSETS_BASE_URL,
      }),
    }));

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: GlobalConfig.SUPPORT_EMAIL,
      to: args.userEmail,
      subject: mockT("emails.2fa-code-email.subject"),
      html: mockRenderHtml,
    });
  });

  test('send2FADisabledEmail sends email with correct options', async () => {
    const args = {
      userEmail: 'user@example.com',
      t: mockT,
    };

    await emailModule.send2FADisabledEmail(args);

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        t: args.t,
        frontendUrl: GlobalConfig.EMAIL_FRONTEND_BASE_URL,
        assetsUrl: GlobalConfig.EMAIL_ASSETS_BASE_URL,
      }),
    }));

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: GlobalConfig.SUPPORT_EMAIL,
      to: args.userEmail,
      subject: mockT("emails.2fa-disabled.subject"),
      html: mockRenderHtml,
    });
  });

  test('sendPasswordResetEmail sends email with correct options', async () => {
    const args = {
      t: mockT,
      userEmail: 'user@example.com',
      expiresInMinutes: 30,
      token: 'reset-token-123',
    };

    await emailModule.sendPasswordResetEmail(args);

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        resetUrl: `${GlobalConfig.EMAIL_FRONTEND_BASE_URL}/reset-password?token=${args.token}`,
        expiresInMinutes: args.expiresInMinutes,
        t: args.t,
        frontendUrl: GlobalConfig.EMAIL_FRONTEND_BASE_URL,
        assetsUrl: GlobalConfig.EMAIL_ASSETS_BASE_URL,
      }),
    }));

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: GlobalConfig.SUPPORT_EMAIL,
      to: args.userEmail,
      subject: mockT("emails.password-reset-email.subject"),
      html: mockRenderHtml,
    });
  });

  test('sendPasswordChangedEmail sends email with correct options', async () => {
    const args = {
      t: mockT,
      userEmail: 'user@example.com',
    };

    await emailModule.sendPasswordChangedEmail(args);

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      props: expect.objectContaining({
        t: args.t,
        frontendUrl: GlobalConfig.EMAIL_FRONTEND_BASE_URL,
        assetsUrl: GlobalConfig.EMAIL_ASSETS_BASE_URL,
      }),
    }));

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: GlobalConfig.SUPPORT_EMAIL,
      to: args.userEmail,
      subject: mockT("emails.password-changed-email.subject"),
      html: mockRenderHtml,
    });
  });
});
