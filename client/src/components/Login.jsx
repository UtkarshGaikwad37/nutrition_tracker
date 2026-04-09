import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API_ENDPOINTS } from "../config/api";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const loggedData = useContext(UserContext);

  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    text: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function changeInput(event) {
    const { name, value } = event.target;
    setUserCred((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify(userCred),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || data.errors?.[0]?.msg || "Login failed",
        );
      }

      setStatus({ type: "success", text: data.message });
      setUserCred({ email: "", password: "" });

      if (data.token) {
        localStorage.setItem("nutrify-item", JSON.stringify(data));
        loggedData?.setLoggedUser?.(data);
        navigate("/track");
      }
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  }

  return (
    <section className="container-fluid login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-heading">Login to the Fitness Club</h1>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter Email"
            required
            className="form-control"
            name="email"
            onChange={changeInput}
            value={userCred.email}
          />
        </div>
        <div className="form-group password-field-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            required
            minLength={8}
            className="form-control"
            name="password"
            onChange={changeInput}
            value={userCred.password}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        <p className="text-black mt-3">
          Don't have an account?{" "}
          <Link className="text-black" to="/register">
            <b>Register</b>
          </Link>
        </p>
        {status.text && (
          <p
            className={status.type === "error" ? "text-danger" : "text-success"}
          >
            {status.text}
          </p>
        )}
      </form>
    </section>
  );
}
