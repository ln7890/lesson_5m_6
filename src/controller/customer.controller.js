import { errorRes } from "../helpers/error.js";
import { createCustomer } from "../validation/customer.validation.js";
import Customer from "../models/customer.model.js";
import jwt from "jsonwebtoken";
import { Token } from "../utils/token.js";
import { successRes } from "../helpers/success.js";
const token = new Token();
export class customerController {
  async signUp(req, res) {
    try {
      const { value, error } = createCustomer(req.body);
      if (error) {
        return errorRes(res, error);
      }
      const existCustomer = await Customer.findOne({ email: value.email });
      if (existCustomer) {
        return errorRes(res, `This email exists`);
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
          refe: refreshToken,
        },
        201
      );
    } catch (error) {
      return errorRes(res, error);
    }
  }
}
