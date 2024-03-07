import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AllCustomers from "./Pages/AllCustomers";
import SignUp from "./SignUp";

const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/dashboard" Component={AllCustomers} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
