import React from 'react';
import { useState } from 'react';
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
    equipmentManagement: false,
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // Helper function to check if a link is active
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  // Helper function to check if a dropdown parent should be open
  const isDropdownActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      {/* Logo Section */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-content">
          <div className="sidebar__logo-icon">
            <span className="sidebar__logo-text">GYM</span>
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
            <div
              className={`sidebar__link sidebar__link--dropdown ${
                isDropdownActive(['/dashboard/all_aerobic', '/dashboard/all_equipments']) ? 'sidebar__link--active' : ''
              }`}
              onClick={() => toggleDropdown('equipmentManagement')}
            >
              <span className="sidebar__icon">
                <CgGym />
              </span>
              <span className="sidebar__label">Equipment</span>
              <span
                className={`sidebar__arrow ${
                  openDropdowns.equipmentManagement ? 'sidebar__arrow--open' : ''
                }`}
              >
                ▼
              </span>
            </div>
            {openDropdowns.equipmentManagement && (
              <ul className="sidebar__submenu">
                <li className="sidebar__submenu-item">
                  <Link 
                    to="/dashboard/all_aerobic" 
                    className={`sidebar__submenu-link ${isLinkActive('/dashboard/all_aerobic') ? 'sidebar__submenu-link--active' : ''}`}
                  >
                    Aerobic Equipment
                  </Link>
                </li>
                <li className="sidebar__submenu-item">
                  <Link 
                    to="/dashboard/all_equipments" 
                    className={`sidebar__submenu-link ${isLinkActive('/dashboard/all_equipments') ? 'sidebar__submenu-link--active' : ''}`}
                  >
                    Exercise Equipment
                  </Link>
                </li>
              </ul>
            )}
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
  );
};

export default Sidebar;