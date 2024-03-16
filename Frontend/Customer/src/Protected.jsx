import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("token");

    if (!uid) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
