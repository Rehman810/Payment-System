import React from "react";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const onFinish = async (values) => {
  let token = localStorage.getItem("token");
  console.log("Success:", values);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/merchant/requestPayment",
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Payment Request has been send",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Something Went Wrong",
      text: "Wrong Customer or Merchant Account Number!",
    });
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const PaymentRequest = () => (
  <Form
    variant="filled"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    style={{
      maxWidth: 600,
      marginLeft: "40vw",
    }}
  >
    <Form.Item
      label="amount"
      name="amount"
      rules={[
        {
          required: true,
          message: "Please input amount",
        },
      ]}
    >
      <InputNumber
        style={{
          width: "100%",
        }}
      />
    </Form.Item>

    <Form.Item
      label="description"
      name="description"
      rules={[
        {
          required: true,
          message: "Please input description",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Customer Account Number"
      name="customerId"
      rules={[
        {
          required: true,
          message: "Please input Customer Account Number",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Merchant Account Number"
      name="merchantaccountNumber"
      rules={[
        {
          required: true,
          message: "Please input Merchant Account Number",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Request
      </Button>
    </Form.Item>
  </Form>
);
export default PaymentRequest;
