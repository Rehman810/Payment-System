import React from "react";
import "../../styles.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm"
      id="mainNav"
    >
      <div className="container px-5">
        <a className="navbar-brand fw-bold" href="#page-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-credit-card-2-back"
            viewBox="0 0 16 16"
          >
            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1" />
          </svg>{" "}
          Customer Portal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="bi-list"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <li className="nav-item">
              <a className="nav-link me-lg-3" href="#features">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-lg-3" href="#features">
                Solutions
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link me-lg-3" href="#features">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-lg-3" href="#features">
                Help Center
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
