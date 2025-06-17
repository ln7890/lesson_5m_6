import { config } from "dotenv";
import express from "express";
import { connectDb } from "./db/data.js";
import transportRoute from "./router/transport.js";
import ticketRouter from "./router/ticket.js";
import routerCustomer from "./router/customer.js";
import cookieParser from "cookie-parser";
config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDb();

app.use("/transport", transportRoute);
app.use("/ticket", ticketRouter);
app.use("/customer", routerCustomer);

app.listen(port, () => console.log(`server runs ${port}`));
