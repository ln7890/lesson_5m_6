import { errorRes } from "../helpers/error.js";
import {
  confirmOtpValidation,
  signInCustomerValidation,
  signUpCustomerValidation,
} from "../validation/customer.validation.js";
import Customer from "../models/customer.model.js";
import jwt from "jsonwebtoken";
import { Token } from "../utils/token.js";
import { successRes } from "../helpers/success.js";
import generateOtp from "../utils/generate-otp.js";
import NodeCache from "node-cache";
import customer from "../models/customer.model.js";
import config from "../config/config.js";
import { transporter } from "../helpers/sendmail.js";

const cache = new NodeCache();
const token = new Token();
export class customerController {
  async signUp(req, res) {
    try {
      const { value, error } = signUpCustomerValidation(req.body);
      if (error) {
        return errorRes(res, error);
      }
      const existCustomer = await Customer.findOne({ email: value.email });
      if (existCustomer) {
        return errorRes(res, `This email exists`, 409);
      }
      const customer = await Customer.create(value);
      const payload = { customer };
      const accessToken = await token.grantAccessToken(payload);
      const refreshToken = await token.generateRefreshToken(payload);
      res.cookie("refreshTokenCustomer", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return successRes(
        res,
        {
          data: payload,
          token: accessToken,
          accTok: accessToken,
        },
        201
      );
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async singInCustomer(req, res) {
    try {
      const { value, error } = signInCustomerValidation(req.body);
      if (error) {
        return errorRes(res, error, 422);
      }
      const email = value.email;
      const existCustomer = await Customer.findOne({
        email,
      });
      if (!existCustomer) {
        return errorRes(res, "Customer not exist", 404);
      }
      const otp = generateOtp();
      cache.set(email, otp, 120);
      const mailOptions = {
        from: config.MAIL_USER,
        to: config.MAIL_USER,
        subject: "from nodemailer",
        text: `here is ur ${otp}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return errorRes(res, `err with sending`);
        } else {
          console.log(info);
        }
      });
      return successRes(res, {
        message: `otp sent`,
      });
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async confirmOtp(req, res) {
    try {
      const { value, error } = confirmOtpValidation(req.body);
      if (error) {
        return errorRes(res, `Error with validation`, 422);
      }
      const existCustomer = await Customer.findOne({ email: value.email });
      if (!existCustomer) {
        return errorRes(res, `Customer not exist with the email`, 404);
      }
      const otpDb = cache.get(value.email);
      if (value.otp != otpDb || !otpDb) {
        return errorRes(res, `OTP invalid`, 400);
      }
      const customer = await Customer.findOne({ email: value.email });
      const payload = { email: customer.email };
      const accessToken = await token.grantAccessToken(payload);
      const refreshToken = await token.generateRefreshToken(payload);
      res.cookie("refreshTokenCustomer", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return successRes(res, { data: customer, token: accessToken }, 201);
    } catch (error) {
      return errorRes(res, error);
    }
  }
}
