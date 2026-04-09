import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import "../css/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [status, setStatus] = useState({
    type: "",
    text: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function changeInput(event) {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || data.errors?.[0]?.msg || "Registration failed",
        );
      }

      setStatus({ type: "success", text: data.message });
      setUserDetails({ name: "", email: "", password: "", age: "" });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  }

  return (
    <section className="container-fluid login-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="login-heading">Welcome to the fitness club</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Name"
            required
            className="form-control"
            name="name"
            onChange={changeInput}
            value={userDetails.name}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter Email"
            required
            className="form-control"
            name="email"
            onChange={changeInput}
            value={userDetails.email}
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
            value={userDetails.password}
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
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter Age"
            required
            min={12}
            max={100}
            className="form-control"
            name="age"
            onChange={changeInput}
            value={userDetails.age}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
        <p className="text-black mt-3">
          Have an account?{" "}
          <Link className="text-black" to="/login">
            <b>Login</b>
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
