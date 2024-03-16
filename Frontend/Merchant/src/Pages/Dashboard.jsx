import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Footer from "./Footer";
import Manage from "./components/Manage";
import Monitor from "./components/Monitor";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Manage />
      <Monitor />
      <Footer />
    </>
  );
};

export default Dashboard;
