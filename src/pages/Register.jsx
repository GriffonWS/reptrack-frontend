import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo.png"; // update if needed
import "../assets/css/Register.css"; // Ensure you have this CSS file for styling

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo-placeholder">
            <img src={logo} alt="Reptrack Logo" className="register-logo" />
          </div>
          <h2>Register</h2>
          <p>Create your account and start your fitness journey</p>
        </div>

        <div className="register-form">
          <div className="name-row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter your first name" required />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last name" required />
            </div>
          </div>

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

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </div>

        <p className="register-footer">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
