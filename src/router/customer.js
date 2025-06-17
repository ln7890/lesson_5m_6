import { Router } from "express";
import { customerController } from "../controller/customer.controller.js";

const router = Router();
const customerCon = new customerController();

router.post("/signup", customerCon.signUp);

export default router;
