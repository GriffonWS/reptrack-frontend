import React from 'react'
import './Overview.css'

const Overview = () => {
  const membersData = [
    { label: 'Total Members', value: 17 },
    { label: 'Active Members', value: 17 },
    { label: 'In-active Members', value: 0 }
  ]

  const equipmentsData = [
    { label: 'Aerobic Equipments', value: 15 },
    { label: 'Exercise Equipments', value: 95 }
  ]

  const StatCard = ({ data }) => {
    return (
      <div className="stat-item">
        <div className="stat-value">{data.value}</div>
        <div className="stat-label">{data.label}</div>
      </div>
    )
  }

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-container">
        <h1 className="dashboard-title">Overview</h1>

        <div className="dashboard-grid">
          {/* Members Card */}
          <div className="card">
            <h2 className="card-title">Members</h2>
            <div className="stats-container">
              {membersData.map((item, index) => (
                <StatCard key={index} data={item} />
              ))}
            </div>
          </div>

          {/* Equipments Card */}
          <div className="card">
            <h2 className="card-title">Equipments</h2>
            <div className="stats-container">
              {equipmentsData.map((item, index) => (
                <StatCard key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview