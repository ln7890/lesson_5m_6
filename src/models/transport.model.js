import { model, Schema } from "mongoose";

const transportSchema = new Schema(
  {
    transport_type: { type: String, required: true },
    class: { type: String, enum: ["eco", "first", "prem"], required: true },
    seat: { type: Number, required: true },
  },
  { timestamps: true }
);

const transportDb = model("mover", transportSchema);

export default transportDb;
