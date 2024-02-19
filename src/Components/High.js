import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../utils/CardSlice";
import j from "./public/j.png";
import "./Header.css";

const High = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
              <Link to={`/cart`}>Cart {cart.item.length===0?'':cart.item.length}</Link>{" "}
            </li>
            <li>
              <Link to={`/cart`} onClick={() => dispatch(clearCart())}>ClearCart</Link>{" "}
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
};

export default High;
