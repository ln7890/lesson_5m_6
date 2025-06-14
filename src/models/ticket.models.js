import { model, Schema, Types } from "mongoose";

const ticketModel = new Schema(
  {
    transport_id: { type: Types.ObjectId, ref: "mover" },
    from: { type: String },
    to: { type: String },
    price: { type: Number },
    departure: { type: Date },
    arrival: { type: Date },
  },
  { timestamps: true }
);

const ticketsDb = model("Ticket", ticketModel);
export default ticketsDb;
