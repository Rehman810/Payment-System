import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AllCustomers from "./Pages/AllCustomers";
import PaymentRequest from "./Pages/PaymentRequest";
import "./styles.css";
const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/login" Component={Login} />
          <Route path="/dashboard" Component={AllCustomers} />
          <Route path="/paymentReq" Component={PaymentRequest} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
