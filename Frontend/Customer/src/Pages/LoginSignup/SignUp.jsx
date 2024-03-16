import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Carousel from "react-bootstrap/Carousel";
import Chart1 from "../../assets/img/dashboard.png";
import Chart2 from "../../assets/img/chart1.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !userName || !phone || !password) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all fields to sign up.",
      });
      return;
    }
    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Password Length",
        text: "Password length must be greater than 8 characters.",
      });
      return;
    }
    const values = { email, password, userName, phone };
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customer/signup",
        values
      );
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "Wrong Email or Password!",
      });
    }
  };
  return (
    <div className="login">
      <div className="login-form">
        <div className="login-txt">
          <span className="login-txt1">Signup</span>
          <span className="login-txt2">
            Customer <span style={{ color: "black" }}>Account</span>
          </span>
        </div>
        <div className="form formSignup">
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
            label="Email"
            name="email"
            variant="outlined"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            id="outlined-basic"
            label="Phone"
            name="phone"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputProps={{ pattern: "[0-9]*" }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" className="btn" onClick={handleSignup}>
            SIGNUP
          </Button>
        </div>
        <span style={{ fontSize: "14px", color: "black" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </span>
      </div>

      <div className="login-img-comp">
        <Carousel>
          <Carousel.Item interval={2000}>
            <div className="carosuel">
              <img src={Chart1} alt="Dashboard" className="login-img" />
              <div className="slider-txt">
                <h2 className="carosuel-h1">Visual Payment Statics</h2>
                <p className="carosuel-p">
                  These visuals are used to analyze and understand various
                  aspects of payment activity , trends and patterns.
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <div className="carosuel">
              <img src={Chart2} alt="Dashboard" className="login-img" />
              <div className="slider-txt">
                <h2 className="carosuel-h1">Visual Payment Statics</h2>
                <p className="carosuel-p">
                  These visuals are used to analyze and understand various
                  aspects of payment activity , trends and patterns.
                </p>
              </div>
            </div>
          </Carousel.Item>{" "}
        </Carousel>
      </div>
    </div>
  );
};

export default SignUp;
