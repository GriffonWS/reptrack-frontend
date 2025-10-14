import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLock, FiLogOut, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
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

  // Close dropdown when clicking outside
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

    // Simulate API call
    setPasswordSuccess('Password updated successfully!');
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };


  return (
    <>
      
      <header className={`navbar ${!sidebarOpen ? 'full-width' : ''}`}>
        <div className="navbar-content">
          {/* Left Side */}
          <div className="navbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <HiOutlineMenu size={24} />
            </button>

            {/* Search Bar */}
            <div className="search-bar">
              <FiSearch className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="navbar-right">
            {/* Notification Button */}
            <button className="notification-btn">
              <FiBell size={22} />
              <span className="notification-badge">3</span>
            </button>

            {/* Profile Section with Dropdown */}
            <div className="profile-wrapper" ref={dropdownRef}>
              <div className="profile-section" onClick={toggleProfileDropdown}>
                <div className="profile-avatar">JD</div>
                <div className="profile-info">
                  <p className="profile-name">John Doe</p>
                  <p className="profile-role">Administrator</p>
                </div>
                <FiChevronDown 
                  className={`profile-chevron ${profileDropdownOpen ? 'rotate' : ''}`} 
                  size={18} 
                />
              </div>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <a href="/dashboard/profile" className="dropdown-item">
                    <FiUser size={18} />
                    <span>My Account</span>
                  </a>
                  <button 
                    className="dropdown-item"
                    onClick={handleChangePasswordClick}
                  >
                    <FiLock size={18} />
                    <span>Change Password</span>
                  </button>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item logout">
                    <FiLogOut size={18} />
                    <span>Logout</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Change Password</h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Old Password */}
              <div className="modal-form-group">
                <label className="modal-label">Old Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    className="modal-input"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="modal-form-group">
                <label className="modal-label">New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="modal-input"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="modal-form-group">
                <label className="modal-label">Confirm New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="modal-input"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {passwordError && (
                <span className="modal-error">{passwordError}</span>
              )}

              {/* Success Message */}
              {passwordSuccess && (
                <span className="modal-success">{passwordSuccess}</span>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                className="modal-btn modal-btn-cancel"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className="modal-btn modal-btn-update"
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