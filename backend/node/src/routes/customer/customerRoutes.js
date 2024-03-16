import express from "express";
import {
  signup,
  login,
  respondToPaymentRequest,
  getPayments,
  authenticateToken,
  customerId,
} from "./customer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/respondToPaymentRequest",
  authenticateToken,
  respondToPaymentRequest
);
router.get("/getPayments", authenticateToken, getPayments);
router.get("/customer-id", customerId);

export default router;
