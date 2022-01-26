import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer bg-success text-black">
      <div className="container ">
        <p className="py-3 mb-0">
          &copy; Copyright {new Date().getFullYear()}, designed by Sridhar Rajaram
        </p>
      </div>
    </footer>
  );
}

export default Footer;
