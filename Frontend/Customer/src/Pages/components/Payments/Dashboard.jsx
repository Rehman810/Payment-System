import React from "react";
import Navbar from "../Navbar";
import Table from "./Table";
import Payments from "./payments";
const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "70vh",
      }}
    >
      <Navbar />
      <Payments />
      <Table />
    </div>
  );
};

export default Dashboard;
