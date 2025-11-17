import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../pages/dashboard/Dashboard.css';
import logos from '../assets/logo-H.png';
import { LiaChartBarSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { BiSupport } from "react-icons/bi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({
    userManagement: false,
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      toggleSidebar();
    }
  }, [location.pathname]);

  // Helper function to check if a link is active
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  // Helper function to check if a dropdown parent should be open
  const isDropdownActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <>
      {/* Overlay for mobile - click to close sidebar */}
      {isOpen && (
        <div
          className="sidebar__overlay"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      {/* Logo Section */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-content">
          <div className="sidebar__logo-icon">
           <img src={logos} alt="Logo" />
          </div>
        </div>
        <button className="sidebar__close" onClick={toggleSidebar}>
          ✕
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {/* Dashboard */}
          <li className="sidebar__item">
            <Link 
              to="/dashboard/overview" 
              className={`sidebar__link ${isLinkActive('/dashboard/overview') ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__icon">
                <LiaChartBarSolid />
              </span>
              <span className="sidebar__label">Overview</span>
            </Link>
          </li>

          {/* User Management */}
          <li className="sidebar__item">
            <div
              className={`sidebar__link sidebar__link--dropdown ${
                isDropdownActive(['/dashboard/all_users']) ? 'sidebar__link--active' : ''
              }`}
              onClick={() => toggleDropdown('userManagement')}
            >
              <span className="sidebar__icon">
                <FaUsers />
              </span>
              <span className="sidebar__label">User Management</span>
              <span
                className={`sidebar__arrow ${
                  openDropdowns.userManagement ? 'sidebar__arrow--open' : ''
                }`}
              >
                ▼
              </span>
            </div>
            {openDropdowns.userManagement && (
              <ul className="sidebar__submenu">
                <li className="sidebar__submenu-item">
                  <Link 
                    to="/dashboard/all_users" 
                    className={`sidebar__submenu-link ${isLinkActive('/dashboard/all_users') ? 'sidebar__submenu-link--active' : ''}`}
                  >
                    All Members
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Equipment Management */}
          <li className="sidebar__item">
            <Link
              to="/dashboard/equipment"
              className={`sidebar__link ${isLinkActive('/dashboard/equipment') ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__icon">
                <CgGym />
              </span>
              <span className="sidebar__label">Equipment</span>
            </Link>
          </li>

          {/* Support */}
          <li className="sidebar__item">
            <Link 
              to="/dashboard/support" 
              className={`sidebar__link ${isLinkActive('/dashboard/support') ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__icon">
                <BiSupport />
              </span>
              <span className="sidebar__label">Support</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;