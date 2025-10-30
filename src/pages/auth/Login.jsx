import React, { useState, useEffect, useRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
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
  const [validationErrors, setValidationErrors] = useState({});
  const uniqueIdInputRef = useRef(null);

  // Auto-focus unique ID input on mount
  useEffect(() => {
    uniqueIdInputRef.current?.focus();
  }, []);

  // Clear error after 5 seconds with fade out animation
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateForm = () => {
    const errors = {};

    if (!formData.uniqueId.trim()) {
      errors.uniqueId = 'Unique ID is required';
    } else if (formData.uniqueId.trim().length < 3) {
      errors.uniqueId = 'Unique ID must be at least 3 characters';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    // Clear validation error for this field when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(formData);

      if (response.success && response.data.token) {
        // Store token in localStorage
        setToken(response.data.token);

        // Show success state briefly before navigation
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.name === 'NetworkError') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An error occurred during login. Please try again.');
      }
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
              <img src={logo} alt="RepTrack Logo" className="logo-image" />
            </div>

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Error Message */}
              {error && (
                <div
                  className="error-message"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              {/* Unique ID Field */}
              <div className="form-group">
                <label htmlFor="uniqueId" className="form-label">Unique ID</label>
                <input
                  ref={uniqueIdInputRef}
                  type="text"
                  id="uniqueId"
                  name="uniqueId"
                  className={`form-input ${validationErrors.uniqueId ? 'input-error' : ''}`}
                  placeholder="Enter your unique ID"
                  value={formData.uniqueId}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="username"
                  aria-label="Unique ID"
                  aria-invalid={validationErrors.uniqueId ? 'true' : 'false'}
                  aria-describedby={validationErrors.uniqueId ? 'uniqueId-error' : undefined}
                  required
                />
                {validationErrors.uniqueId && (
                  <span
                    id="uniqueId-error"
                    className="validation-error"
                    role="alert"
                  >
                    {validationErrors.uniqueId}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group password-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${validationErrors.password ? 'input-error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                  aria-label="Password"
                  aria-invalid={validationErrors.password ? 'true' : 'false'}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
                {validationErrors.password && (
                  <span
                    id="password-error"
                    className="validation-error"
                    role="alert"
                  >
                    {validationErrors.password}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="login-right">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
            alt="Gym Training"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
