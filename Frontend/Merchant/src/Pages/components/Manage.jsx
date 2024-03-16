import React from "react";
import Img from "../../assets/img/img-text-one.png";
const Manage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%", marginLeft: "10vw" }}>
        <img src={Img} alt="" style={{ width: "80%" }} />
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginRight: "10vw",
        }}
      >
        <span style={{ color: "violet", fontSize: "25px", fontWeight: "bold" }}>
          Manage Customers
        </span>
        <span style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
          repudiandae veritatis numquam quod, accusamus similique magnam
          voluptatum nulla quas animi totam, tempora consectetur doloremque,
          dolorem voluptatem qui? Nam, numquam pariatur?
        </span>
      </div>
    </div>
  );
};

export default Manage;
