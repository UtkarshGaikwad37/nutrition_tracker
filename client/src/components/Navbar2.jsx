import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/Navbar.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const loggedData = useContext(UserContext);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(loggedData?.loggedUser);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function logout() {
    localStorage.removeItem("nutrify-item");
    loggedData?.setLoggedUser?.(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div
        className="container"
        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
      >
        <Link className="navbar-brand" to={isLoggedIn ? "/track" : "/"}>
          Fitness Club
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} style={{ color: "red" }} />
        </button>
        <div
          className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/track">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/diet">
                    Diet
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link btn btn-link text-decoration-none"
                    onClick={logout}
                    style={{ color: "white" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
