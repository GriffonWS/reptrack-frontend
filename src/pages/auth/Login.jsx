
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './auth.css';
import logo from '../../assets/logo.png';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login attempted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login successful');
      setFormData({ email: '', password: '' });
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Section */}
        <div className="login-left">
          <div className="login-form-wrapper">
            {/* Logo */}
            <div className="logo">
              <img src={logo} alt="Logo" className="logo-image" />
            </div>
           

            {/* Form */}
            <div className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="form-group password-group">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="signup-link">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="login-right">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
            alt="Gym"
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
