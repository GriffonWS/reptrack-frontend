import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import './AllAerobic.css';
import { Link } from 'react-router-dom';
import { getEquipmentByCategory } from '../../../services/equipment/equipmentService';
import { removeToken } from '../../../utils/token';
import Loader from '../../../components/Loader/Loader';

const AllAerobic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aerobicEquipments, setAerobicEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch Aerobic equipment on component mount
  useEffect(() => {
    fetchAerobicEquipment();
  }, []);

  const fetchAerobicEquipment = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getEquipmentByCategory('Aerobic');

      if (response.success && response.data) {
        setAerobicEquipments(response.data);
      } else {
        setError('Failed to load aerobic equipment');
      }
    } catch (err) {
      console.error('Error fetching aerobic equipment:', err);
      setError(err.message || 'Failed to load aerobic equipment');

      // If unauthorized, redirect to login
      if (err.message.includes('Unauthorized') || err.message.includes('token')) {
        removeToken();
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEquipments = aerobicEquipments.filter(equipment =>
    equipment.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.equipment_number.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Error Message */}
        {error && (
          <div className="aerobic__error-card">
            <FiAlertCircle className="aerobic__error-icon" />
            <div>
              <p className="aerobic__error-title">Error Loading Aerobic Equipment</p>
              <p className="aerobic__error-message">{error}</p>
              <button
                className="aerobic__error-retry"
                onClick={fetchAerobicEquipment}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Equipment Grid */}
        {!isLoading && !error && (
          <div className="aerobic__grid">
            {filteredEquipments.length === 0 ? (
              <div className="aerobic__no-data">
                {searchTerm ? 'No equipment found matching your search' : 'No aerobic equipment found. Add some to get started!'}
              </div>
            ) : (
              filteredEquipments.map((equipment) => (
                <div key={equipment.id} className="aerobic__card">
                  <div className="aerobic__card-image">
                    {equipment.equipment_image ? (
                      <img
                        src={equipment.equipment_image}
                        alt={equipment.equipment_name}
                        className="aerobic__equipment-image"
                      />
                    ) : (
                      <div className="aerobic__image-placeholder">
                        🏋️
                      </div>
                    )}
                  </div>
                  <div className="aerobic__card-badge">{equipment.equipment_number}</div>
                  <div className="aerobic__card-content">
                    <h3 className="aerobic__card-name">{equipment.equipment_name}</h3>
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
export default AllAerobic;