// Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLock, FiLogOut } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import '../../src/pages/dashboard/Dashboard.css';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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

  return (
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
                <a href="#" className="dropdown-item">
                  <FiUser size={18} />
                  <span>My Account</span>
                </a>
                <a href="#" className="dropdown-item">
                  <FiLock size={18} />
                  <span>Change Password</span>
                </a>
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
  );
};

export default Navbar;