import React, { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaUsers,
  FaDumbbell,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUserCog,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Outlet } from "react-router-dom"; // optional - shows where page content goes
import "../assets/css/Dashboard.css"; // Ensure you have this CSS file for styling
const NavItem = ({ icon: Icon, label, active, onClick, rightNode }) => (
  <button
    className={`nav-item ${active ? "active" : ""}`}
    onClick={onClick}
    type="button"
    aria-current={active ? "page" : undefined}
  >
    <span className="nav-icon">
      <Icon />
    </span>
    <span className="nav-label">{label}</span>
    {rightNode && <span className="nav-right">{rightNode}</span>}
  </button>
);

const Dashboard = () => {
  // sidebar dropdown state
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  // active nav key (e.g., "dashboard", "all-members", "aerobic")
  const [activeKey, setActiveKey] = useState("dashboard");

  // profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);

  // mobile: collapsed sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  // close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && window.innerWidth < 768) {
        // clicking outside should close mobile sidebar
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // keyboard escape to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setSidebarOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // helper to toggle dropdown and mark active
  const handleNavSelect = (key, opts = {}) => {
    setActiveKey(key);
    if (opts.openUserMgmt !== undefined) setUserMgmtOpen(opts.openUserMgmt);
    if (opts.openEquipment !== undefined) setEquipmentOpen(opts.openEquipment);
    // close mobile sidebar after navigation
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Mobile hamburger */}
      <div className="mobile-topbar">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="mobile-brand">Reptrack</div>
        <div className="mobile-profile-preview" onClick={() => setProfileOpen((p) => !p)}>
          <FaUserCircle />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-hidden={!sidebarOpen && window.innerWidth < 768 ? "true" : "false"}
      >
        <div className="sidebar-header">
          <div className="logo-wrap" onClick={() => handleNavSelect("dashboard")}>
            <div className="logo-icon">🏋️</div>
            <div className="logo-text">Reptrack</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <NavItem
            icon={FaHome}
            label="Dashboard"
            active={activeKey === "dashboard"}
            onClick={() => handleNavSelect("dashboard")}
          />

          <div className="nav-section">
            <NavItem
              icon={FaUsers}
              label="User Management"
              active={activeKey === "all-members" || userMgmtOpen}
              onClick={() => {
                setUserMgmtOpen((s) => !s);
                setEquipmentOpen(false);
              }}
              rightNode={<IoIosArrowDown className={`chev ${userMgmtOpen ? "open" : ""}`} />}
            />
            <div
              className={`submenu ${userMgmtOpen ? "open" : ""}`}
              style={{ maxHeight: userMgmtOpen ? "200px" : "0px" }}
            >
              <button
                className={`submenu-item ${activeKey === "all-members" ? "active" : ""}`}
                onClick={() => handleNavSelect("all-members")}
              >
                All Members
              </button>
            </div>
          </div>

          <div className="nav-section">
            <NavItem
              icon={FaDumbbell}
              label="Equipment Management"
              active={equipmentOpen || activeKey === "aerobic" || activeKey === "exercise"}
              onClick={() => {
                setEquipmentOpen((s) => !s);
                setUserMgmtOpen(false);
              }}
              rightNode={<IoIosArrowDown className={`chev ${equipmentOpen ? "open" : ""}`} />}
            />
            <div
              className={`submenu ${equipmentOpen ? "open" : ""}`}
              style={{ maxHeight: equipmentOpen ? "240px" : "0px" }}
            >
              <button
                className={`submenu-item ${activeKey === "aerobic" ? "active" : ""}`}
                onClick={() => handleNavSelect("aerobic")}
              >
                Aerobic Equipment
              </button>
              <button
                className={`submenu-item ${activeKey === "exercise" ? "active" : ""}`}
                onClick={() => handleNavSelect("exercise")}
              >
                Exercise Equipment
              </button>
            </div>
          </div>

          <NavItem
            icon={FaEnvelope}
            label="Communication & Support"
            active={activeKey === "support"}
            onClick={() => handleNavSelect("support")}
          />
        </nav>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">Dashboard</h1>
          </div>

          <div className="topbar-right">
            <div ref={profileRef} className="profile-area">
              <button
                className="profile-toggle"
                onClick={() => setProfileOpen((s) => !s)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                type="button"
              >
                <FaUserCircle className="profile-avatar" />
                <span className="profile-name">Shivani</span>
                <IoIosArrowDown className={`chev ${profileOpen ? "open" : ""}`} />
              </button>

              <div className={`profile-menu ${profileOpen ? "open" : ""}`} role="menu">
                <button
                  className="profile-menu-item"
                  onClick={() => {
                    setProfileOpen(false);
                    // handle my account action
                    setActiveKey("my-account");
                  }}
                >
                  <FaUserCog className="menu-icon" />
                  My Account
                </button>

                <button
                  className="profile-menu-item"
                  onClick={() => {
                    setProfileOpen(false);
                    setActiveKey("change-password");
                  }}
                >
                  <FaKey className="menu-icon" />
                  Change Password
                </button>

                <button
                  className="profile-menu-item"
                  onClick={() => {
                    setProfileOpen(false);
                    setActiveKey("logout");
                    // Add logout logic here
                  }}
                >
                  <FaSignOutAlt className="menu-icon" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          {/* Placeholder area / routing outlet */}
          <div className="content-placeholder">
            {/* If you're using React Router, Outlet will render nested routes here */}
            <Outlet />
            {/* If no Outlet or route, show a friendly placeholder */}
            <div className="dashboard-cards">
              <div className="card stat-card">
                <h3>Members</h3>
                <div className="stat-grid">
                  <div className="stat">
                    <div className="stat-number">17</div>
                    <div className="stat-label">Total Members</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">17</div>
                    <div className="stat-label">Active Members</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">0</div>
                    <div className="stat-label">In-active Members</div>
                  </div>
                </div>
              </div>

              <div className="card stat-card">
                <h3>Equipments</h3>
                <div className="stat-grid">
                  <div className="stat">
                    <div className="stat-number">21</div>
                    <div className="stat-label">Aerobic Equipments</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">95</div>
                    <div className="stat-label">Exercise Equipments</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="placeholder-bottom">
              <p>Place your charts, tables, and widgets here.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
