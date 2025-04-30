// mailer.ts
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

export async function sendTestEmail() {
  const info = await transporter.sendMail({
    from: '"Test Sender" <sender@example.com>',
    to: 'recipient@example.com',
    subject: 'Test Email from smtp4dev',
    text: 'Hello! This is a test email sent via smtp4dev.',
    html: '<p>Hello! This is a <b>test email</b> sent via smtp4dev.</p>',
  });

  console.log('Message sent:', info.messageId);
}
