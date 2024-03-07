import express from "express";
import customerRoutes from "../customer/customerRoutes.js";
import merchantRoutes from "../merchant/merchantRoutes.js";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/customer", customerRoutes);
app.use("/merchant", merchantRoutes);

export default app;
