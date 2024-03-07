import React from "react";
import DashBoardImg from "../../assets/img/dashboard.png";
const Banner = () => {
  return (
    <div>
      <div className="slider">
        <div className="con">
          <h1 className="Slider-hero">
            Optimizing Bussiness <br /> Paymants
          </h1>
          <p className="Slider-noob">
            Lorem ipsum dolor sit amet consectespernatur commod <br />i earum
            placeat nostrum nulla quasi! Nobis, quam!
          </p>
        </div>
        <div className="slider-img">
          <img className="slide-dashboard-img" src={DashBoardImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
