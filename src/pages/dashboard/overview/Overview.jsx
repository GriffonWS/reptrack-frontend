import React from 'react';
import { FiUsers, FiActivity } from 'react-icons/fi';
import './Overview.css';

const Overview = () => {
  const membersData = [
    { label: 'Total Members', value: 17 },
    { label: 'Active Members', value: 17 },
    { label: 'Inactive Members', value: 0 }
  ];

  const equipmentsData = [
    { label: 'Aerobic Equipments', value: 15 },
    { label: 'Exercise Equipments', value: 100 }
  ];

  const StatCard = ({ data, index }) => {
    return (
      <div className="overview__stat-item" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="overview__stat-value">{data.value}</div>
        <div className="overview__stat-label">{data.label}</div>
      </div>
    );
  };

  return (
    <div className="overview__wrapper">
      <div className="overview__container">
        {/* Header */}
        <div className="overview__header">
          <h1 className="overview__title">Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="overview__grid">
          {/* Members Card */}
          <div className="overview__card">
            <h2 className="overview__card-title">Members</h2>
            <div className="overview__stats-container">
              {membersData.map((item, index) => (
                <StatCard key={index} data={item} index={index} />
              ))}
            </div>
          </div>

          {/* Equipments Card */}
          <div className="overview__card">
            <h2 className="overview__card-title">Equipments</h2>
            <div className="overview__stats-container">
              {equipmentsData.map((item, index) => (
                <StatCard key={index} data={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Overview;