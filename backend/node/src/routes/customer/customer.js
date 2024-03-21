import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import mainSchema from "../../schema/customerSchema.js";
import Payment from "../../schema/paymentSchema.js";
import * as dotenv from "dotenv";
dotenv.config();

const tok = process.env.JWT_TOKEN_KEY;

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

// Define Joi schema for signup validation
const schema = Joi.object({
  userName: Joi.string().required().max(20),
  phone: Joi.string().required().max(12),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(15),
});

function generateToken(user) {
  return jwt.sign(
    { email: user.email, accountNumber: user.accountNumber, _id: user._id },
    tok
  );
}

async function generateUniqueRandomNumber() {
  let randomNumber;
  let isUnique = false;

  // Generate random numbers until a unique one is found
  while (!isUnique) {
    // Generate a random number (adjust the range as needed)
    randomNumber = Math.floor(Math.random() * 10000000000000);

    // Check if the number exists in the database
    isUnique = !(await isNumberExists(randomNumber));
  }

  return randomNumber;
}

async function isNumberExists(number) {
  const result = await mainSchema.findOne({ number });
  return !!result; // return true if number exists, false otherwise
}

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

    // Generate a unique random number
    const randomNumber = await generateUniqueRandomNumber();

    // Create a new customer record with the random number
    const newUser = new mainSchema({
      ...req.body,
      password: hash,
      accountNumber: randomNumber,
    });

    // Save the new customer record including the random number
    const response = await newUser.save();

    // Generate JWT token for the new customer
    const token = generateToken(response);

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
        // const token = jwt.sign(
        //   {
        //     email: user[0].email,
        //     _id: user[0]._id,
        //   },
        //   tok
        // );
        const token = generateToken(user[0]);

        // Send success response with token
        res
          .status(200)
          .json({ status: 200, message: "Customer login successful", token });
      } else {
        // Return error response for incorrect email/password
        res
          .status(401)
          .json({ status: 401, message: "Email/password incorrect" });
      }
    } else {
      // Return error response if user not found
      res.status(404).json({ status: 404, message: "Customer not found" });
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

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      customerAccountNumber: req.user.accountNumber,
    });

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCustomerInfo = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }
  try {
    const decodedToken = jwt.verify(token, tok);
    const customerId = decodedToken._id;
    console.log(decodedToken._id);
    const customerInfo = await mainSchema
      .findById(customerId)
      .select("-password");
    res.json({ customerInfo });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export const records = async (req, res) => {
  try {
    // Fetch total counts of pending, paid, and rejected records
    const totalPending = await Payment.countDocuments({ status: "pending" });
    const totalPaid = await Payment.countDocuments({ status: "paid" });
    const totalRejected = await Payment.countDocuments({ status: "rejected" });

    // Send the totals as a JSON response
    res.json({ totalPending, totalPaid, totalRejected });
  } catch (error) {
    // Handle errors
    console.error("Error fetching total records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
