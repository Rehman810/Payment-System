import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import DashBoardImg from "../assets/img/dashboard.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customer/login",
        values
      );
      localStorage.setItem("token", response.data.token);
      console.log("Response:", response.data.token);
      navigate("/dashboard");
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
            Customer<span style={{ color: "black" }}>Account</span>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
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
