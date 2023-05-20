import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Split-it</h1>
      <p>Split the Bill, Simplify Your Payments</p>
      <button onClick={handleButtonClick}>Get Started</button>
    </div>
  );
}

export default LandingPage;
