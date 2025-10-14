import React, { useState } from 'react'
import { FaDumbbell, FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerAdmin } from '../../services/auth/authServices'
import './auth.css'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await registerAdmin({
        email,
        firstname: firstName,
        lastname: lastName,
        password,
        role
      })

      alert('Registration successful!')
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
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
                  <FaDumbbell />
                </div>
                <div className="logo-text">Reptrack</div>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                {error && (
                  <div style={{ 
                    padding: '10px', 
                    marginBottom: '15px', 
                    backgroundColor: '#fee', 
                    color: '#c00',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}>
                    {error}
                  </div>
                )}

                <div className="name-row">
                  <div className="form-group half">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

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

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Sign up'}
                </button>
              </form>

              <div className="signup-link">
                Already have an account?{' '}
                <a href='/Login'>Sign in</a>
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

export default Register