import React from "react";
import "./Header.css";
import j from "./public/j.png";
import { Link } from "react-router-dom";
const High = () => {
  return (
    <div>
      <div className="Header">
        <div className="logo">
          <img src={j} width={200} height={150} alt="logo" />
        </div>
        <header className="App-header">
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>
            <li>
              <Link to={`/about`}>About Us</Link>
            </li>
            <li>
              <Link to={`/#`}>Cart</Link>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
};

export default High;
