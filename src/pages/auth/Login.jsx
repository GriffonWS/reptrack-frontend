import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo (1).png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Login Form */}
        <div className="login-form-section">
          <div className="form-content">
           <img src={logo} alt="Logo" className="logo" />
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="#forgot">Forgot Password?</a>
              </div>

              <button type="submit" className="sign-in-btn">
                Sign in
              </button>
            </form>

            <div className="signup-link">
              Don't you have an account? <a href="/Register">Sign up</a>
            </div>

          </div>
        </div>

        {/* Right Side - Artwork */}
        <div className="artwork-section">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
            alt="Floral artwork"
            className="artwork-image"
          />
        </div>
      </div>

      {/* Mobile Card Version */}
      <div className="mobile-card">
        <div className="mobile-artwork">
          <img
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80"
            alt="Floral artwork"
          />
        </div>
        <div className="mobile-form-content">
          <h1 className="welcome-title">Welcome Back 👋</h1>
          <p className="welcome-subtitle">
            Today is a new day. It's your day. You shape it.
            <br />
            Sign in to start managing your projects.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email-mobile">Email</label>
              <input
                type="email"
                id="email-mobile"
                placeholder="Example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password-mobile">Password</label>
              <input
                type="password"
                id="password-mobile"
                placeholder="At least 8 characters"
                required
              />
            </div>

            <div className="forgot-password">
              <a href="#forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="sign-in-btn">
              Sign in
            </button>
          </form>

          <div className="signup-link">
            Don't you have an account? <a href="/Register">Sign up</a>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Login;