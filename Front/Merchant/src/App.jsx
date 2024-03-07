import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
// import Protected from "./Protected";
// import NotFound from "./NotFound";

const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/" Component={Dashboard} />
          <Route path="/login" Component={Login} />

          {/* 404 Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
