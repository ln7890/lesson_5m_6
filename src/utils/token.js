import jwt from "jsonwebtoken";

export class Token {
  async grantAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });
  }
  async generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });
  }
  async verify(token, secretKey) {
    return jwt.verify(token, secretKey);
  }
}
