import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import './AllEquipments.css';
import { Link } from 'react-router-dom';

const AllEquipments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const exerciseEquipments = [
    { id: 1, name: 'Dumbbell Set', quantity: 50, image: '🏋️' },
    { id: 2, name: 'Barbell', quantity: 25, image: '⚖️' },
    { id: 3, name: 'Kettlebell', quantity: 35, image: '🔔' },
    { id: 4, name: 'Resistance Bands', quantity: 45, image: '🎯' },
    { id: 5, name: 'Bench Press', quantity: 8, image: '🛏️' },
    { id: 6, name: 'Cable Machine', quantity: 6, image: '⚙️' },
    { id: 7, name: 'Lat Pulldown', quantity: 4, image: '📌' },
    { id: 8, name: 'Leg Press', quantity: 3, image: '🦵' },
    { id: 9, name: 'Ab Crunch Machine', quantity: 5, image: '💪' },
    { id: 10, name: 'Leg Curl Machine', quantity: 4, image: '🔄' },
    { id: 11, name: 'Smith Machine', quantity: 2, image: '🏗️' },
    { id: 12, name: 'Squat Rack', quantity: 3, image: '🥇' },
  ];

  const filteredEquipments = exerciseEquipments.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="equipment__container">
      <div className="equipment__wrapper">
        {/* Header */}
        <div className="equipment__header">
          <h1 className="equipment__title">Exercise Equipments</h1>
          <Link to="/dashboard/add_equipment" className="equipment__add-btn" style={{textDecoration:"none"}}>
            <AiOutlinePlus size={20} />
            Add New Equipment
          </Link>
        </div>

        {/* Search Bar */}
        <div className="equipment__search-box">
          <div className="equipment__search-wrapper">
            <AiOutlineSearch className="equipment__search-icon" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="equipment__search-input"
            />
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="equipment__grid">
          {filteredEquipments.length === 0 ? (
            <div className="equipment__no-data">
              No equipment found matching your search
            </div>
          ) : (
            filteredEquipments.map((equipment) => (
              <div key={equipment.id} className="equipment__card">
                <div className="equipment__card-image">
                  <div className="equipment__image-placeholder">
                    {equipment.image}
                  </div>
                </div>
                <div className="equipment__card-badge">{equipment.quantity}</div>
                <div className="equipment__card-content">
                  <h3 className="equipment__card-name">{equipment.name}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
       </div>
  );
};

export default AllEquipments;