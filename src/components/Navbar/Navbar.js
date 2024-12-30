import React from "react";
import "./Navbar.css";

const Navbar = ({ onColorChange }) => {
  const handleColorClick = (color) => {
    onColorChange(color); // Emit the color value to the parent component
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Do-It App</h1>
      <div className="theme">
        <span
          className="color-option blue"
          onClick={() => handleColorClick("blue")}
        ></span>
        <span
          className="color-option white"
          onClick={() => handleColorClick("white")}
        ></span>
        <span
          className="color-option green"
          onClick={() => handleColorClick("green")}
        ></span>
        <span
          className="color-option orange"
          onClick={() => handleColorClick("orange")}
        ></span>
        <span
          className="color-option space"
          onClick={() => handleColorClick("space")}
        ></span>
      </div>
    </nav>
  );
};

export default Navbar;
