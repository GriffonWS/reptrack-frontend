import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import logo from '../../assets/logo (1).png'
import './auth.css'
import { loginAdmin } from '../../services/auth/authServices.js'  // ✅ Import your login service

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // ✅ Call backend login API
      const response = await loginAdmin(email, password)
      console.log('✅ Login successful:', response)

      // Redirect after token is saved
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('❌ Login failed:', error)
      alert(error?.message || 'Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-left">
            <div className="login-form-wrapper">
              <div className="logo">
                <div className="logo-icon">
                  <img src={logo} alt="" />
                </div>
              </div>

              <div className="login-form">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group password-group">
                  <label className="form-label">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="forgot-password">
                  <a onClick={() => alert('Forgot password clicked')}>
                    Forgot Password?
                  </a>
                </div>

                {/* ✅ Real login here */}
                <button
                  type="button"
                  className="submit-btn"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <div className="signup-link">
                Don't you have an account? <a href='/Register'>Sign up</a>
              </div>
            </div>
          </div>

          <div className="login-right">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
              alt="Gym"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
