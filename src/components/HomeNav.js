import React from "react";
import { Link } from "react-router-dom";

function HomeNav() {
  const style = {
    textDecoration: "none",
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-success text-white">
        <div className="container">
          <Link style={style} to="/">
            <span className="navbar-brand mb-0">CRM App</span>
          </Link>
          <div>
            <Link to="/login">
              <button className="btn btn-primary px-4 m-2 my-sm-0">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-warning px-4 m-2 my-sm-0">
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HomeNav;
