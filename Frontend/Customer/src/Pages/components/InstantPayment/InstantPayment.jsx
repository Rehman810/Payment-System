import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import "./Instant.css";
import Navbar from "../Navbar";

const InstantPayment = () => {
  const [userName, setUserName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = React.useState("");

  const handleChange = (event) => {
    setBank(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="instant">
        <h1 className="paymentsh1">Instant Payments</h1>
        <div className="paymentForm">
          <TextField
            id="outlined-basic"
            label="UserName"
            name="userName"
            variant="outlined"
            className="input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Customer Account Number"
            name="customerId"
            className="input"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            type="number"
          />
          <TextField
            id="outlined-basic"
            label="Customer Account Number"
            name="merchantId"
            className="input"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Payment Amount"
            name="amount"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Payment Description"
            name="description"
            variant="outlined"
            multiline
            rows={2}
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bank Name</InputLabel>
            <Select
              className="input"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bank}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Habib Bank</MenuItem>
              <MenuItem value={20}>Meezan Bank</MenuItem>
              <MenuItem value={30}>National Bank</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" className="btn">
            PAY
          </Button>
        </div>
      </div>
    </>
  );
};

export default InstantPayment;
