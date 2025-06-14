import { Router } from "express";
import { transportController } from "../controller/transport.controller.js";

const router = Router();
const transportCon = new transportController();

router
  .post("/", transportCon.createTransport)
  .get("/", transportCon.showAllTransports)
  .get("/:id", transportCon.getTransportsById)
  .patch("/:id", transportCon.updateTransportById)
  .delete("/:id", transportCon.deleteTransportById);

export default router;
