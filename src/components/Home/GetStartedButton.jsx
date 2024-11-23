import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function GetStartedButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/get-started"); // Replace "/get-started" with your target route
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "20px", marginBottom: "50px" }}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={handleClick}
        style={{ padding: "10px 30px", fontSize: "18px" }}
      >
        Get Started
      </Button>
    </div>
  );
}

export default GetStartedButton;
