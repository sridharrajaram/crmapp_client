import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/error-404-monochrome.svg"; // relative path to image

import "./NotFound.css";

function NotFound() {
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center mt-4">
                  <img className="mb-4 img-error" src={logo} alt="404 logo" />
                  <p className="lead">
                    This requested URL was not found on this server.
                  </p>
                  <Link to="/">Return to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default NotFound;
