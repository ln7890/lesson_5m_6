import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    await connect(process.env.MONGO_URL);
    return console.log(`success`);
  } catch (error) {
    return console.log(error);
  }
};
