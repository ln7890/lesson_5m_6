import config from "../config/config.js";
import { errorRes } from "../helpers/error.js";
import { Token } from "../utils/token.js";
const tokenService = new Token();
export const authGuard = async (req, res, next) => {
  const auth = req.headers.auth;

  if (!auth) {
    return errorRes(res, `Forbidden user`, 403);
  }
  const bearer = auth.split(" ")[0];
  const authToken = auth.split(" ")[1];
  if (bearer !== "Bearer" || !authToken || !bearer) {
    return errorRes(res, `Token error`);
  }
  try {
    const user = await tokenService.validateToken(
      authToken,
      config.ACCESS_TOKEN_KEY
    );
    req.user = user;
    next();
  } catch (error) {
    return errorRes(res, `Unathorized`, 401);
  }
};
