import jwt from "jsonwebtoken";
import Payment from "../../schema/paymentSchema.js";
import * as dotenv from "dotenv";
dotenv.config();

const tok = process.env.JWT_TOKEN_KEY;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve hardcoded merchant credentials from environment variables
    const hardcodedMerchantEmail = process.env.MERCHANT_EMAIL;
    const hardcodedMerchantPassword = process.env.MERCHANT_PASSWORD;

    // Check if provided credentials match the hardcoded merchant account
    if (
      email === hardcodedMerchantEmail &&
      password === hardcodedMerchantPassword
    ) {
      // Generate JWT token for the merchant with dynamic role assignment
      const token = jwt.sign(
        { email: email, role: "merchant" }, // Hardcoded merchant ID
        tok
      );
      res.json({ token });
    } else {
      // Return specific error message for invalid credentials
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    // Improve error logging for debugging purposes
    console.error("Error logging in merchant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authenticateToken = (req, res, next) => {
  try {
    // Retrieve token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      // Return specific error message for missing token
      return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, tok, (err, decoded) => {
      if (err) {
        // Return specific error message for invalid token
        return res.status(403).json({ message: "Invalid token" });
      }

      // Check for valid role in decoded token
      if (decoded.role !== "merchant") {
        // Return specific error message for unauthorized access
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Attach decoded user information to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    // Improve error logging for debugging purposes
    console.error("Error authenticating token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const requestPayment = async (req, res) => {
  try {
    const { amount, description, customerId } = req.body;

    // Validate payment details
    if (!amount || !description || !customerId) {
      // Return specific error message for missing payment details
      return res
        .status(400)
        .json({ message: "Missing required payment details" });
    }

    // Extract merchantId from decoded JWT token
    const merchantId = req.user.email;

    // Create new payment
    const newPayment = new Payment({
      amount,
      description,
      customerId,
      merchantId,
      status: "pending",
    });

    // Save payment to database
    const savedPayment = await newPayment.save();

    // Return success response with created payment details
    res.status(201).json({
      message: "Payment requested successfully",
      payment: savedPayment,
    });
  } catch (error) {
    // Improve error logging for debugging purposes
    console.error("Error requesting payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPayments = async (req, res) => {
  try {
    // Retrieve all payments from the database
    const payments = await Payment.find();

    // Return success response with payments data
    res.json(payments);
  } catch (error) {
    // Improve error logging for debugging purposes
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificPayment = async (req, res) => {
  try {
    // Retrieve specific payment by ID from the database
    const payment = await Payment.findById(req.params.paymentId);

    // Check if payment exists
    if (!payment) {
      // Return specific error message for payment not found
      return res.status(404).json({ message: "Payment not found" });
    }

    // Return success response with payment data
    res.json(payment);
  } catch (error) {
    // Improve error logging for debugging purposes
    console.error("Error fetching payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
