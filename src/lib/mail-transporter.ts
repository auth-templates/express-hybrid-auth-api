import GlobalConfig from "../config.js";
import nodemailer from 'nodemailer';

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
