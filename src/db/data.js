import { connect } from "mongoose";
import config from "../config/config.js";

export const connectDb = async () => {
  try {
    await connect(config.MONGO_URL);
    return console.log(`success`);
  } catch (error) {
    return console.log(error);
  }
};
