import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Carousel from "react-bootstrap/Carousel";
import Chart1 from "../../assets/img/dashboard.png";
import Chart2 from "../../assets/img/chart1.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all fields to login.",
      });
      return;
    }
    const values = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customer/login",
        values
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
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
          <span className="login-txt1">Login</span>
          <span className="login-txt2">
            Customer Portal <span style={{ color: "black" }}>Account</span>
          </span>
        </div>
        <div className="form">
          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" className="btn" onClick={handleLogin}>
            LOGIN
          </Button>
        </div>
        <span style={{ fontSize: "14px", color: "black" }}>
          Create an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
          >
            SignUp
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
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Login;
