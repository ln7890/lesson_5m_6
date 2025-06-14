import { Router } from "express";
import { ticketManage } from "../controller/ticket.controller.js";

const router = Router();
const ticketCon = new ticketManage();

router
  .post("/", ticketCon.createTicket)
  .get("/", ticketCon.getAllTickets)
  .get("/:id", ticketCon.getTicketsById)
  .patch("/:id", ticketCon.updateTicket)
  .delete("/:id", ticketCon.cancelTicket);

export default router;
