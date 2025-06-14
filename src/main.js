import { config } from "dotenv";
import express from "express";
import { connectDb } from "./db/data.js";
import transportRoute from "./router/transport.js";
import ticketRouter from "./router/ticket.js";
config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

await connectDb();

app.use("/transport", transportRoute);
app.use("/ticket", ticketRouter);

app.listen(port, () => console.log(`server runs ${port}`));
