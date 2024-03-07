import express from "express";
import router from "./src/routes/router/router.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// Connect to MongoDB
const mongoURI = process.env.MONGODB_KEY;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) =>
  res.send("Welcome to Person-to-Merchant Payment System.")
);
app.use("/api", router);

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
