import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";

import "./UserNav.css";

function UserNav() {
  const [user, setUser] = useState("");
  const history = useHistory();

  useEffect(() => setUser(localStorage.getItem("user")), []);

  function openSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    cogoToast.success("Logout Successful. Please visit again.");
    history.push("/login");
  }

  return (
    <nav className="nav navbar-light d-flex justify-content-between align-items-center py-2">
      <button className="navbar-toggler btn btn-sm" onClick={openSidebar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="dropdown">
        <section
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {`Welcome, ${user} `}
        </section>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <button onClick={onLogout} className="dropdown-item">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default UserNav;
