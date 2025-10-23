import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLock, FiLogOut, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import { removeToken } from '../utils/token';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleChangePasswordClick = () => {
    setChangePasswordOpen(true);
    setProfileDropdownOpen(false);
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleCloseModal = () => {
    setChangePasswordOpen(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleUpdatePassword = () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }
    if (oldPassword === newPassword) {
      setPasswordError('New password cannot be the same as old password');
      return;
    }
    setPasswordSuccess('Password updated successfully!');
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    removeToken();
    // Close dropdown
    setProfileDropdownOpen(false);
    // Navigate to login page
    navigate('/login');
  };

  return (
    <>
      <header className={`navbar ${!sidebarOpen ? 'navbar--full-width' : ''}`}>
        <div className="navbar__content">
          {/* Navbar Left */}
          <div className="navbar__left">
            <button className="navbar__toggle" onClick={toggleSidebar}>
              <HiOutlineMenu size={24} />
            </button>
            <div className="navbar__search">
              <FiSearch className="navbar__search-icon" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="navbar__search-input"
              />
            </div>
          </div>

          {/* Navbar Right */}
          <div className="navbar__right">
            <button className="navbar__notification">
              <FiBell size={22} />
              <span className="navbar__badge">3</span>
            </button>

            {/* Profile Section */}
            <div className="navbar__profile" ref={dropdownRef}>
              <div className="navbar__profile-section" onClick={toggleProfileDropdown}>
                <div className="navbar__avatar">JD</div>
                <div className="navbar__info">
                  <p className="navbar__name">John Doe</p>
                  <p className="navbar__role">Administrator</p>
                </div>
                <FiChevronDown
                  className={`navbar__chevron ${profileDropdownOpen ? 'navbar__chevron--active' : ''}`}
                  size={18}
                />
              </div>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="navbar__dropdown">
                  <Link to="/dashboard/profile" className="navbar__dropdown-item">
                    <FiUser size={18} />
                    <span>My Account</span>
                  </Link>
                  <button
                    className="navbar__dropdown-item"
                    onClick={handleChangePasswordClick}
                  >
                    <FiLock size={18} />
                    <span>Change Password</span>
                  </button>
                  <div className="navbar__divider"></div>
                  <button 
                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                    onClick={handleLogout}
                  >
                    <FiLogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div className="modal__overlay" onClick={handleCloseModal}>
          <div
            className="modal__container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal__header">
              <h2 className="modal__title">Change Password</h2>
              <button
                className="modal__close"
                onClick={handleCloseModal}
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal__body">
              {/* Old Password */}
              <div className="modal__form-group">
                <label className="modal__label">Old Password</label>
                <div className="modal__input-wrapper">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    className="modal__input"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="modal__toggle-btn"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="modal__form-group">
                <label className="modal__label">New Password</label>
                <div className="modal__input-wrapper">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="modal__input"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="modal__toggle-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="modal__form-group">
                <label className="modal__label">Confirm New Password</label>
                <div className="modal__input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="modal__input"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="modal__toggle-btn"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error & Success Messages */}
              {passwordError && (
                <div className="modal__error">{passwordError}</div>
              )}
              {passwordSuccess && (
                <div className="modal__success">{passwordSuccess}</div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal__footer">
              <button className="modal__btn modal__btn--cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="modal__btn modal__btn--update"
                onClick={handleUpdatePassword}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;