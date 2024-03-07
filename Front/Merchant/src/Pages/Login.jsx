import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import DashBoardImg from "../assets/img/dashboard.png";
import "./login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "https://payment-system-sigma.vercel.app/api/merchant/login",
        loginData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-txt">
          <span className="login-txt1">Login</span>
          <span className="login-txt2">
            PayHabib <span style={{ color: "black" }}>Account</span>
          </span>
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
            ]}
          >
            <Input onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password onChange={handleChange} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "blueviolet" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="login-img-comp">
        <img src={DashBoardImg} alt="Dashboard" className="login-img" />
      </div>
    </div>
  );
};

export default Login;
