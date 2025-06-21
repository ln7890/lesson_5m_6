import jwt from "jsonwebtoken";
import configEnv from "../config/config.js";

export class Token {
  async grantAccessToken(payload) {
    return jwt.sign(payload, configEnv.ACCESS_TOKEN_KEY, {
      expiresIn: configEnv.ACCESS_TOKEN_TIME,
    });
  }
  async generateRefreshToken(payload) {
    return jwt.sign(payload, configEnv.REFRESH_TOKEN_KEY, {
      expiresIn: configEnv.REFRESH_TOKEN_TIME,
    });
  }
  async validateToken(token, secretKey) {
    return jwt.verify(token, secretKey);
  }
}
