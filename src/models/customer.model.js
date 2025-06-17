import { model, Schema } from "mongoose";

const customerSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
  },
  { timestamps: true }
);

const customer = model("customer", customerSchema);

export default customer;
