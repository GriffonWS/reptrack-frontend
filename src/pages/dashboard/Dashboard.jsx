import React, { useState , useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import '../dashboard/Dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Set sidebar closed by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Check on initial load
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <main className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>

        <div className="dashboard-cards">
          {/* Members Card */}
          <div className="stats-card">
            <h2 className="card-title">Members</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">17</div>
                <div className="stat-label">Total Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">17</div>
                <div className="stat-label">Active Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">In-active Members</div>
              </div>
            </div>
          </div>

          {/* Equipments Card */}
          <div className="stats-card">
            <h2 className="card-title">Equipments</h2>
            <div className="stats-grid stats-grid-2">
              <div className="stat-item">
                <div className="stat-number">15</div>
                <div className="stat-label">Aerobic Equipments</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95</div>
                <div className="stat-label">Exercise Equipments</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;