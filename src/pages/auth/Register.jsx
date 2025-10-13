import React, { useState } from 'react';
import './register.css';
import logo from '../../assets/logo (1).png';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted:', { firstName, lastName, email, password });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Desktop Layout - Left Side: Register Form */}
        <div className="register-form-section">
          <div className="form-content">
            
            <img src={logo} alt="" />

            <div className="login-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </div>

              <button onClick={handleSubmit} className="sign-in-btn">
                Sign up
              </button>
            </div>

            <div className="signup-link">
              Already have an account? <a href="/Login">Sign in</a>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Right Side: Artwork */}
        <div className="artwork-section">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
            alt="Gym workout"
            className="artwork-image"
          />
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="mobile-card">
        <div className="mobile-artwork">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
            alt="Gym workout"
          />
        </div>
        <div className="mobile-form-content">
          

          <div className="login-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName-mobile">First Name</label>
                <input
                  type="text"
                  id="firstName-mobile"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName-mobile">Last Name</label>
                <input
                  type="text"
                  id="lastName-mobile"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email-mobile">Email</label>
              <input
                type="email"
                id="email-mobile"
                placeholder="Example@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password-mobile">Password</label>
              <input
                type="password"
                id="password-mobile"
                placeholder="At least 8 characters"
              />
            </div>

            <button onClick={handleSubmit} className="sign-in-btn">
              Sign up
            </button>
          </div>

          <div className="signup-link">
            Already have an account? <a href='/Login'>Sign in</a>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Register;