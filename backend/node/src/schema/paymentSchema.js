import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String, required: false },
    customerAccountNumber: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    merchantAccountNumber: {
      type: String,
      ref: "Merchant",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
