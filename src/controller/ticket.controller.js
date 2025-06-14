import { errorRes } from "../helpers/error.js";
import { successRes } from "../helpers/success.js";
import ticketsDb from "../models/ticket.models.js";
import {
  ticketValidation,
  updateTcktVld,
} from "../validation/ticket.validation.js";
import { isValidObjectId } from "mongoose";

export class ticketManage {
  async createTicket(req, res) {
    try {
      const { value, error } = ticketValidation(req.body);
      if (error) {
        return errorRes(res, error, 422);
      }
      const ticket = await ticketsDb.create(value);
      return successRes(res, ticket);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async getAllTickets(_, res) {
    try {
      const tickets = await ticketsDb.find().populate("transport_id");
      return successRes(res, tickets);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async getTicketsById(req, res) {
    try {
      const id = req.params.id;
      const ticket = await ticketManage.findTicketsById(res, id);
      return successRes(res, ticket);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async updateTicket(req, res) {
    try {
      const id = req.params.id;
      await ticketManage.findTicketsById(res, id);
      const { value, error } = updateTcktVld(req.body);
      if (error) {
        return errorRes(res, error);
      }
      const updatedTicket = await ticketsDb.findByIdAndUpdate(id, value, {
        new: true,
      });
      return successRes(res, updatedTicket);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async cancelTicket(req, res) {
    try {
      const id = req.params.id;
      await ticketManage.findTicketsById(res, id);
      await ticketsDb.findByIdAndDelete(id);
      return successRes(res, { message: "ticket removed" });
    } catch (error) {
      return errorRes(res, error);
    }
  }
  static async findTicketsById(res, id) {
    try {
      if (!isValidObjectId(id)) {
        return errorRes(res, `Invalid ObjId`, 422);
      }
      const ticket = await ticketsDb.findById(id).populate("transport_id");
      if (!ticket) {
        return errorRes(res, `No ticket`, 404);
      }
      return ticket;
    } catch (error) {
      return errorRes(res, error);
    }
  }
}
