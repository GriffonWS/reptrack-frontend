import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiAlertCircle } from 'react-icons/fi';
import './Equipment.css';
import Loader from '../../../components/Loader/Loader';
import EquipmentModal from './EquipmentModal';
import {
  getAllEquipments,
  deleteEquipment as deleteEquipmentAPI,
} from '../../../services/equipment/equipmentService';
import { removeToken } from '../../../utils/token';

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [allEquipments, setAllEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const TABS = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Aerobic', value: 'Aerobic' },
    { label: 'Exercise', value: 'Exercise' },
  ];

  // Fetch all equipment on component mount
  useEffect(() => {
    fetchAllEquipment();
  }, []);

  const fetchAllEquipment = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getAllEquipments();

      if (response.success && response.data) {
        setAllEquipments(response.data);
      } else {
        setError('Failed to load equipment');
      }
    } catch (err) {
      console.error('Error fetching equipment:', err);
      setError(err.message || 'Failed to load equipment');

      // If unauthorized, redirect to login
      if (err.message.includes('Unauthorized') || err.message.includes('token')) {
        removeToken();
        window.location.href = '/login';
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Filter equipment based on active tab and search term
  const filteredEquipments = allEquipments.filter((equipment) => {
    const matchesTab = activeTab === 'ALL' || equipment.category === activeTab;
    const matchesSearch =
      equipment.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.equipment_number.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAddClick = () => {
    setEditingEquipment(null);
    setShowModal(true);
  };

  const handleEditClick = (equipment) => {
    setEditingEquipment(equipment);
    setShowModal(true);
  };

  const handleDeleteClick = async (equipmentId) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        setDeleteLoading(equipmentId);
        setDeleteError('');
        await deleteEquipmentAPI(equipmentId);

        // Remove from local state
        setAllEquipments(allEquipments.filter(eq => eq.id !== equipmentId));
      } catch (err) {
        setDeleteError(err.message || 'Failed to delete equipment');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingEquipment(null);
  };

  const handleModalSave = (newEquipment) => {
    if (editingEquipment) {
      // Update existing equipment
      setAllEquipments(
        allEquipments.map((eq) =>
          eq.id === editingEquipment.id ? newEquipment : eq
        )
      );
    } else {
      // Add new equipment
      setAllEquipments([...allEquipments, newEquipment]);
    }
    handleModalClose();
  };

  return (
    <div className="equipment__container">
      <div className="equipment__wrapper">
        {/* Header */}
        <div className="equipment__header">
          <h1 className="equipment__title">Equipment Management</h1>
          <button className="equipment__add-btn" onClick={handleAddClick}>
            <AiOutlinePlus size={20} />
            Add New Equipment
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="equipment__tabs-section">
          <div className="equipment__tabs">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                className={`equipment__tab ${activeTab === tab.value ? 'equipment__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="equipment__search-box">
          <div className="equipment__search-wrapper">
            <AiOutlineSearch className="equipment__search-icon" />
            <input
              type="text"
              placeholder="Search equipment by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="equipment__search-input"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="equipment__error-card">
            <FiAlertCircle className="equipment__error-icon" />
            <div>
              <p className="equipment__error-title">Error Loading Equipment</p>
              <p className="equipment__error-message">{error}</p>
              <button
                className="equipment__error-retry"
                onClick={fetchAllEquipment}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Delete Error Message */}
        {deleteError && (
          <div className="equipment__error-card">
            <FiAlertCircle className="equipment__error-icon" />
            <div>
              <p className="equipment__error-title">Error Deleting Equipment</p>
              <p className="equipment__error-message">{deleteError}</p>
              <button
                className="equipment__error-retry"
                onClick={() => setDeleteError('')}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Equipment Grid */}
        {!isLoading && !error && (
          <div className="equipment__grid">
            {filteredEquipments.length === 0 ? (
              <div className="equipment__no-data">
                {searchTerm
                  ? 'No equipment found matching your search'
                  : `No ${activeTab !== 'ALL' ? activeTab.toLowerCase() : ''} equipment found. Add some to get started!`}
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
                      <div className="equipment__image-placeholder">🏋️</div>
                    )}
                  </div>
                  <div className="equipment__card-badge">
                    {equipment.equipment_number}
                  </div>
                  <div className="equipment__card-category">
                    {equipment.category}
                  </div>
                  <div className="equipment__card-content">
                    <h3 className="equipment__card-name">
                      {equipment.equipment_name}
                    </h3>
                  </div>
                  <div className="equipment__card-actions">
                    <button
                      className="equipment__action-btn equipment__action-btn--edit"
                      onClick={() => handleEditClick(equipment)}
                      title="Edit equipment"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      className="equipment__action-btn equipment__action-btn--delete"
                      onClick={() => handleDeleteClick(equipment.id)}
                      disabled={deleteLoading === equipment.id}
                      title="Delete equipment"
                    >
                      {deleteLoading === equipment.id ? (
                        <div className="equipment__action-spinner" />
                      ) : (
                        <MdDelete size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Equipment Modal */}
      {showModal && (
        <EquipmentModal
          equipment={editingEquipment}
          allEquipments={allEquipments}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default Equipment;
