import React from "react";
import "./Footer.css";
import Wave from "../../img/wave.png";
import {
  UilWhatsapp,
  UilFacebookF,
  UilTwitter,
  UilGithubAlt,
  UilInstagram,
} from "@iconscout/react-unicons";

const Footer = () => {
  return (
    <div className="footer">
      <img src={Wave} alt="" style={{ width: "100%" }} />
      <div className="f-content">
        <span>
          <a
            className="email-text"
            href="https://mail.google.com/mail/?view=cm&to=azamkhangl805@gmail.com"
            target="_blank"
            title="gmail account"
          >
            azamkhangl805@gmail.com
          </a>
        </span>
        <div className="f-icons">
          <a href="https://www.instagram.com/malak_azamkhan/">
            <UilInstagram color="white" size={"3rem"} />
          </a>
          <a href="https://www.instagram.com/malak_azamkhan/">
            <UilFacebookF color="white" size={"3rem"} />
          </a>
          <a href="https://github.com/Azam-khanCs">
            <UilGithubAlt color="white" size={"3rem"} />
          </a>
          <a href="https://wa.me/00923419002614">
            <UilWhatsapp color="white" size={"3rem"} />
          </a>
          <a href="https://twitter.com/AzamKhan411">
            <UilTwitter color="white" size={"3rem"} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
