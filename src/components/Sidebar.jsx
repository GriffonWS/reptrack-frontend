// Sidebar.jsx
import React from 'react';
import { useState } from 'react';
import '../pages/dashboard/Dashboard.css';
import logos from '../assets/logo-H.png';
import { LiaChartBarSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { BiSupport } from "react-icons/bi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openDropdowns, setOpenDropdowns] = useState({
    userManagement: false,
    equipmentManagement: false
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-content">
          <div className="logo-icon">
            <img src={logos} alt="" />
          </div>
          
        </div>
        <button className="sidebar-close" onClick={toggleSidebar}>
          ✕
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {/* Dashboard */}
          <li className="menu-item">
            <a href="/dashboard/overview" className="menu-link active">
              <span className="menu-icon"><LiaChartBarSolid /></span>
              <span>Overview</span>
            </a>
          </li>

          {/* User Management Dropdown */}
          <li className="menu-item">
            <div 
              className="menu-link dropdown-toggle"
              onClick={() => toggleDropdown('userManagement')}
            >
              <span className="menu-icon"><FaUsers /></span>
              <span>User Management</span>
              <span className={`dropdown-arrow ${openDropdowns.userManagement ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            {openDropdowns.userManagement && (
              <ul className="submenu">
                <li className="submenu-item">
                  <a href="/dashboard/all_users" className="submenu-link">All Members</a>
                </li>
              </ul>
            )}
          </li>

          {/* Equipment Management Dropdown */}
          <li className="menu-item">
            <div 
              className="menu-link dropdown-toggle"
              onClick={() => toggleDropdown('equipmentManagement')}
            >
              <span className="menu-icon"><CgGym /></span>
              <span>Equipment Management</span>
              <span className={`dropdown-arrow ${openDropdowns.equipmentManagement ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            {openDropdowns.equipmentManagement && (
              <ul className="submenu">
                <li className="submenu-item">
                  <a href="/dashboard/all_aerobic" className="submenu-link">Aerobic Equipment</a>
                </li>
                <li className="submenu-item">
                  <a href="/dashboard/all_equipments" className="submenu-link">Exercise Equipment</a>
                </li>
              </ul>
            )}
          </li>

          {/* Communication and Support */}
          <li className="menu-item">
            <a href="/dashboard/support" className="menu-link">
              <span className="menu-icon"><BiSupport />
</span>
              <span>Communication and Support</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;





