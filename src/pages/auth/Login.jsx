
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import logo from '../../assets/logo.png';
import { loginUser } from '../../services/auth/authService';
import { setToken } from '../../utils/token';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uniqueId: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await loginUser(formData);

      if (response.success && response.data.token) {
        // Store token in localStorage
        setToken(response.data.token);

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
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
              {/* Error Message */}
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {/* Unique ID Field */}
              <div className="form-group">
                <label className="form-label">Unique ID</label>
                <input
                  type="text"
                  name="uniqueId"
                  className="form-input"
                  placeholder="RT-20"
                  value={formData.uniqueId}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
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
                  required
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
