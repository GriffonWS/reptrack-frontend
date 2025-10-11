import React, { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/Login.css"; // Ensure you have this CSS file for styling
import logo from "../assets/logo.png"; // update if needed

const Login = () => {

     const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div>
         <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-placeholder">
            <img src={logo} alt="Reptrack Logo" className="register-logo" />
          </div>
          <h2>Login</h2>
          <p>Welcome back! Login to continue your fitness journey</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group password-field">
            <label>Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="eye-button"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </div>

        <p className="login-footer">
          Don't have an account?{" "}
          <a href="/register" className="register-link">
            Sign Up
          </a>
        </p>
      </div>
      
    </div>
    </div>
  )
}

export default Login
