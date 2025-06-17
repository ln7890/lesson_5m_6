import { isValidObjectId } from "mongoose";
import { errorRes } from "../helpers/error.js";
import { successRes } from "../helpers/success.js";
import transportDb from "../models/transport.model.js";
import {
  transportValid,
  updateTrVld,
} from "../validation/transport.validation.js";

export class transportController {
  async createTransport(req, res) {
    try {
      const { value, error } = await transportValid(req.body);
      if (error) {
        return successRes(res, error, 422);
      }
      const transport = await transportDb.create(value.body);
      return successRes(res, transport);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async showAllTransports(_, res) {
    try {
      const transports = await transportDb.find().populate("tickets");
      return successRes(res, transports);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async getTransportsById(req, res) {
    try {
      const id = req.params.id;
      const transport = await transportController.findTrasportById(res, id);
      return successRes(res, transport);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async updateTransportById(req, res) {
    try {
      const id = req.params.id;
      await transportController.findTrasportById(res, id);
      const { value, error } = updateTrVld(req.body);
      if (error) {
        return errorRes(res, error);
      }
      const updatedTr = await transportDb.findByIdAndUpdate(id, value, {
        new: true,
        runValidators: true,
      });
      return successRes(res, updatedTr);
    } catch (error) {
      return errorRes(res, error);
    }
  }
  async deleteTransportById(req, res) {
    try {
      const id = req.params.id;
      await transportController.findTrasportById(res, id);
      await transportDb.findByIdAndDelete(id);
      return successRes(res, { message: "Deleted ok" });
    } catch (error) {
      return errorRes(res, error);
    }
  }
  static async findTrasportById(res, id) {
    try {
      if (!isValidObjectId(id)) {
        return successRes(res, "Invalid ObjId");
      }
      const transport = await transportDb.findById(id);
      if (!transport) {
        return successRes(res, `No transport`, 404);
      }
      return transport;
    } catch (error) {
      return errorRes(res, error);
    }
  }
}
