import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import './AllAerobic.css';
import { Link } from 'react-router-dom';

const AllAerobic = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const aerobicEquipments = [
    { id: 1, name: 'Recumbent Bike', quantity: 15, image: '🚴' },
    { id: 2, name: 'Concept2 Rower', quantity: 14, image: '🚣' },
    { id: 3, name: 'Stair Stepper', quantity: 13, image: '🪜' },
    { id: 4, name: 'Assault Bike', quantity: 12, image: '🚲' },
    { id: 5, name: 'Stationary Bike', quantity: 11, image: '🚴' },
    { id: 6, name: 'Treadmill', quantity: 10, image: '🏃' },
    { id: 7, name: 'Elliptical', quantity: 9, image: '🏋️' },
    { id: 8, name: 'VersaClimber', quantity: 8, image: '🧗' },
  ];

  const filteredEquipments = aerobicEquipments.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="aerobic__container">
      <div className="aerobic__wrapper">
        {/* Header */}
        <div className="aerobic__header">
          <h1 className="aerobic__title">Aerobic Equipment</h1>
          <Link to="/dashboard/add_aerobic" className="aerobic__add-btn" style={{textDecoration:"none"}}>
            <AiOutlinePlus size={20} />
            Add New Aerobic Equipment
          </Link>
        </div>

        {/* Search Bar */}
        <div className="aerobic__search-box">
          <div className="aerobic__search-wrapper">
            <AiOutlineSearch className="aerobic__search-icon" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="aerobic__search-input"
            />
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="aerobic__grid">
          {filteredEquipments.length === 0 ? (
            <div className="aerobic__no-data">
              No equipment found matching your search
            </div>
          ) : (
            filteredEquipments.map((equipment) => (
              <div key={equipment.id} className="aerobic__card">
                <div className="aerobic__card-image">
                  <div className="aerobic__image-placeholder">
                    {equipment.image}
                  </div>
                </div>
                <div className="aerobic__card-badge">{equipment.quantity}</div>
                <div className="aerobic__card-content">
                  <h3 className="aerobic__card-name">{equipment.name}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default AllAerobic;