import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLock, FiLogOut, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import { removeToken } from '../utils/token';
import { getGymOwnerByToken, changePassword as changePasswordAPI, logout as logoutAPI } from '../services/gymOwner/gymOwnerService';

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
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [gymOwnerData, setGymOwnerData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const dropdownRef = useRef(null);

  // Fetch gym owner data on mount
  useEffect(() => {
    fetchGymOwnerData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchGymOwnerData = async () => {
    try {
      setIsLoadingProfile(true);
      setProfileError('');
      const response = await getGymOwnerByToken();

      if (response.success && response.data) {
        setGymOwnerData(response.data);
      } else {
        setProfileError('Failed to load profile data');
      }
    } catch (error) {
      console.error('Error fetching gym owner data:', error);
      setProfileError(error.message || 'Failed to load profile');

      // If unauthorized, redirect to login
      if (error.message.includes('Unauthorized') || error.message.includes('token')) {
        removeToken();
        navigate('/login');
      }
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Get initials from owner name
  const getInitials = (name) => {
    if (!name) return 'GO';
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

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

  const handleUpdatePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    // Client-side validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
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

    // Call API to change password
    try {
      setIsPasswordLoading(true);
      const response = await changePasswordAPI({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (response.success) {
        setPasswordSuccess('Password updated successfully!');
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setPasswordError(response.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError(error.message || 'Failed to update password');

      // If unauthorized, redirect to login
      if (error.message.includes('Unauthorized') || error.message.includes('token')) {
        setTimeout(() => {
          handleCloseModal();
          removeToken();
          navigate('/login');
        }, 1500);
      }
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Call API to logout (clear token on server)
      await logoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Remove token from localStorage
      removeToken();
      // Close dropdown
      setProfileDropdownOpen(false);
      // Navigate to login page
      navigate('/login');
    }
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

          </div>

          {/* Navbar Right */}
          <div className="navbar__right">
            

            {/* Profile Section */}
            <div className="navbar__profile" ref={dropdownRef}>
              <div className="navbar__profile-section" onClick={toggleProfileDropdown}>
                {isLoadingProfile ? (
                  <div className="navbar__avatar navbar__avatar--loading">
                    <div className="spinner-small"></div>
                  </div>
                ) : gymOwnerData?.profileImage ? (
                  <img
                    src={gymOwnerData.profileImage}
                    alt={gymOwnerData.ownerName || 'Profile'}
                    className="navbar__avatar-image"
                  />
                ) : (
                  <div className="navbar__avatar">
                    {getInitials(gymOwnerData?.ownerName)}
                  </div>
                )}
                <div className="navbar__info">
                  <p className="navbar__name">
                    {isLoadingProfile ? 'Loading...' : gymOwnerData?.ownerName || 'Gym Owner'}
                  </p>
                  <p className="navbar__role">Gym Owner</p>
                </div>
                <FiChevronDown
                  className={`navbar__chevron ${profileDropdownOpen ? 'navbar__chevron--active' : ''}`}
                  size={18}
                />
              </div>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="navbar__dropdown">
                  <Link
                    to="/dashboard/profile"
                    className="navbar__dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
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
                disabled={isPasswordLoading}
              >
                {isPasswordLoading ? (
                  <>
                    <span className="spinner"></span>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;