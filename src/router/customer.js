import { Router } from "express";
import { customerController } from "../controller/customer.controller.js";
import { authGuard } from "../guards/auth.guards.js";
const router = Router();
const customerCon = new customerController();

router
  .post("/signup", customerCon.signUp)
  .post("/signin", customerCon.singInCustomer)
  .post("/signin-otp", customerCon.confirmOtp)
  .post("/token", customerCon.generateAccessToken)
  .post("/logout", authGuard, customerCon.logOut);
export default router;
