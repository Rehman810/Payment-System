import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import mainSchema from "../../schema/customerSchema.js";
import Payment from "../../schema/paymentSchema.js";
import * as dotenv from "dotenv";
dotenv.config();

const tok = process.env.JWT_TOKEN_KEY;

// Define Joi schema for signup validation
const schema = Joi.object({
  userName: Joi.string().required().max(20),
  phone: Joi.string().required().max(12),
  email: Joi.string().required().email(),
  password: Joi.string().required().max(8),
});

export const signup = async (req, res) => {
  try {
    // Validate request body against Joi schema
    await schema.validateAsync(req.body, { abortEarly: false });

    // Check if customer with provided email already exists
    const users = await mainSchema.find({ email: req.body.email });
    if (users.length) {
      return res.status(401).json({
        status: 401,
        message: "Customer already exists",
      });
    }

    // Hash the password
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Create a new customer record
    const newUser = new mainSchema({
      ...req.body,
      password: hash,
    });

    // Save the new customer record
    const response = await newUser.save();

    // Generate JWT token for the new customer
    const token = jwt.sign({ email: response.email, _id: response._id }, tok);

    // Send success response with token
    res
      .status(200)
      .json({ status: 200, message: "Customer added successfully", token });
  } catch (err) {
    // Handle validation errors
    res.status(401).json({ status: 401, err });
  }
};

export const login = async (req, res) => {
  try {
    // Find user with provided email
    const user = await mainSchema.find({ email: req.body.email });

    if (user.length) {
      // Compare passwords
      const match = bcrypt.compareSync(req.body.password, user[0].password);
      if (match) {
        // Generate JWT token for the user
        const token = jwt.sign(
          {
            email: user[0].email,
            _id: user[0]._id,
          },
          tok
        );

        // Send success response with token
        res
          .status(200)
          .json({ status: 200, message: "User login successful", token });
      } else {
        // Return error response for incorrect email/password
        res
          .status(401)
          .json({ status: 401, message: "Email/password incorrect" });
      }
    } else {
      // Return error response if user not found
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    // Handle server errors
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const respondToPaymentRequest = async (req, res) => {
  try {
    const { paymentId, action } = req.body;

    // Find the payment by ID
    const payment = await Payment.findById(paymentId);

    // Check if payment exists
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update payment status based on customer action
    if (action === "approve") {
      payment.status = "paid";
    } else if (action === "reject") {
      payment.status = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Save updated payment status
    await payment.save();

    // Send response with updated payment details
    res.json({ message: "Payment status updated successfully", payment });
  } catch (error) {
    console.error("Error responding to payment request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware function to authenticate JWT token and attach user to request object
export const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, tok, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach user information to the request object
    req.user = decoded;
    next();
  });
};

export const getPayments = async (req, res) => {
  try {
    // Retrieve payments associated with the current user
    const payments = await Payment.find({
      customerId: req.user._id,
    });

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Define a route to get the customer ID
export const customerId = async (req, res) => {
  // Retrieve the JWT token from the request header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  try {
    // Decode the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract customer ID from the decoded token
    const customerId = decodedToken._id;

    // Send the customer ID in the response
    res.json({ customerId });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};
