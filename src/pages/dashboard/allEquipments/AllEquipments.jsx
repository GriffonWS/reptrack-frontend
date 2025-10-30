import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import './AllEquipments.css';
import { Link } from 'react-router-dom';
import { getEquipmentByCategory } from '../../../services/equipment/equipmentService';
import Loader from '../../../components/Loader/Loader';

const AllEquipments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exerciseEquipments, setExerciseEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExerciseEquipment();
  }, []);

  const fetchExerciseEquipment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEquipmentByCategory('Exercise');

      if (response.success && Array.isArray(response.data)) {
        setExerciseEquipments(response.data);
      } else {
        setError('Invalid response format from server');
      }
    } catch (err) {
      setError(err.message || 'Failed to load exercise equipment');
    } finally {
      setLoading(false);
    }
  };

  const filteredEquipments = exerciseEquipments.filter(equipment =>
    equipment.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.equipment_number.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Error State */}
        {error && (
          <div className="equipment__error-card">
            <MdError className="equipment__error-icon" />
            <div>
              <h3 className="equipment__error-title">Error Loading Equipment</h3>
              <p className="equipment__error-message">{error}</p>
              <button
                onClick={fetchExerciseEquipment}
                className="equipment__error-retry"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <Loader />}

        {/* Equipment Grid */}
        {!loading && !error && (
          <div className="equipment__grid">
            {filteredEquipments.length === 0 ? (
              <div className="equipment__no-data">
                {exerciseEquipments.length === 0
                  ? 'No exercise equipment available'
                  : 'No equipment found matching your search'}
              </div>
            ) : (
              filteredEquipments.map((equipment) => (
                <div key={equipment.id} className="equipment__card">
                  <div className="equipment__card-image">
                    {equipment.equipment_image ? (
                      <img
                        src={equipment.equipment_image}
                        alt={equipment.equipment_name}
                        className="equipment__equipment-image"
                      />
                    ) : (
                      <div className="equipment__image-placeholder">
                        🏋️
                      </div>
                    )}
                  </div>
                  <div className="equipment__card-badge">{equipment.equipment_number || '0'}</div>
                  <div className="equipment__card-content">
                    <h3 className="equipment__card-name">{equipment.equipment_name}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEquipments;