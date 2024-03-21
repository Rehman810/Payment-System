import express from "express";
import {
  login,
  authenticateToken,
  requestPayment,
  getPayments,
  getSpecificPayment,
} from "./merchant.js";

const router = express.Router();
router.post("/login", login);
router.post("/requestPayment", authenticateToken, requestPayment);
router.get("/getPayments", authenticateToken, getPayments);
router.get("/getSpecificPayment/:paymentId", getSpecificPayment);

export default router;
