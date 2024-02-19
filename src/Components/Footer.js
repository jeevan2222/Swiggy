import React from "react";
import "./Footer.css";
import { FaFacebookF, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

import { SiSwiggy } from "react-icons/si";

const Footer = () => {
  return (
    <div className="footer">
      <p>Jeevank @2024</p>
      <p>
        Contact Us <SiSwiggy />
      </p>
      <div class="social">
        <i>
          {" "}
          <FaFacebookF />
        </i>
        <i>
          {" "}
          <FaSquareInstagram />
        </i>
        <i>
          {" "}
          <FaLinkedin />
        </i>
        <i>
          {" "}
          <FaGithub />
        </i>
      </div>
    </div>
  );
};

export default Footer;
