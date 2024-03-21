import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/components/Payments/Dashboard";
import Login from "./Pages/LoginSignup/Login";
import AllCustomers from "./Pages/AllCustomers";
import SignUp from "./Pages/LoginSignup/SignUp";
import Protected from "./Protected";
import InstantPayment from "./Pages/components/InstantPayment/InstantPayment";

const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Protected Component={Login} />} />
          <Route path="/signup" element={<Protected Component={SignUp} />} />
          <Route path="/" element={<Protected Component={Dashboard} />} />
          <Route
            path="/instantPayments"
            element={<Protected Component={InstantPayment} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
