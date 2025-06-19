import nodemailer, { createTransport } from "nodemailer";
import config from "../config/config.js";
export const transporter = createTransport({
  port: config.MAIL_PORT,
  host: config.MAIL_HOST,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
  secure: true,
});
