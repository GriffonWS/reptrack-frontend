import React, { useState, useEffect } from 'react';
import { FiX, FiUpload, FiImage } from 'react-icons/fi';
import './EquipmentModal.css';
import {
  createEquipment as createEquipmentAPI,
  updateEquipment as updateEquipmentAPI,
} from '../../../services/equipment/equipmentService';

const EquipmentModal = ({ equipment, allEquipments = [], onClose, onSave }) => {
  const [formData, setFormData] = useState({
    equipment_name: '',
    equipment_number: '',
    category: 'Exercise',
  });

  const [equipmentImage, setEquipmentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if equipment number exists (for client-side validation)
  const isEquipmentNumberDuplicate = (number) => {
    if (!number.trim()) return false;
    return allEquipments.some(
      (eq) =>
        eq.equipment_number.toLowerCase() === number.toLowerCase() &&
        (!equipment || eq.id !== equipment.id) // Allow same number when editing same equipment
    );
  };

  // Populate form if editing
  useEffect(() => {
    if (equipment) {
      setFormData({
        equipment_name: equipment.equipment_name,
        equipment_number: equipment.equipment_number,
        category: equipment.category,
      });
      setImagePreview(equipment.equipment_image || '');
    }
  }, [equipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Image selected:', file.name, file.type, file.size, 'bytes');
      setEquipmentImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.equipment_name || !formData.equipment_number) {
        setError('Equipment name and number are required');
        setSaving(false);
        return;
      }

      // Validate equipment number is unique
      if (isEquipmentNumberDuplicate(formData.equipment_number.trim())) {
        setError(`Equipment number "${formData.equipment_number}" already exists. Please use a unique number.`);
        setSaving(false);
        return;
      }

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('equipment_name', formData.equipment_name);
      formDataToSend.append('equipment_number', formData.equipment_number);
      formDataToSend.append('category', formData.category);

      // Append image if selected
      if (equipmentImage) {
        console.log('Appending image:', equipmentImage.name, equipmentImage.size, 'bytes');
        formDataToSend.append('equipment_image', equipmentImage);
      }

      let response;
      if (equipment) {
        // Update existing equipment
        response = await updateEquipmentAPI(equipment.id, formDataToSend);
      } else {
        // Create new equipment
        response = await createEquipmentAPI(formDataToSend);
      }

      if (response.success && response.data) {
        setSuccess(
          equipment
            ? 'Equipment updated successfully!'
            : 'Equipment added successfully!'
        );
        // Call onSave with the response data
        setTimeout(() => {
          onSave(response.data);
        }, 500);
      }
    } catch (err) {
      setError(err.message || 'Failed to save equipment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="equipment-modal__overlay" onClick={onClose}>
      <div className="equipment-modal__content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="equipment-modal__header">
          <h2 className="equipment-modal__title">
            {equipment ? 'Edit Equipment' : 'Add New Equipment'}
          </h2>
          <button
            className="equipment-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="equipment-modal__form" onSubmit={handleSubmit}>
          {/* Image Section */}
          <div className="equipment-modal__image-section">
            <div className="equipment-modal__image-preview">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Equipment Preview"
                  className="equipment-modal__preview-image"
                />
              ) : (
                <FiImage size={48} className="equipment-modal__preview-icon" />
              )}
            </div>

            <label className="equipment-modal__upload-btn">
              <FiUpload size={18} />
              <span>
                {imagePreview ? 'Change Image' : 'Upload Equipment Image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="equipment-modal__file-input"
              />
            </label>
            <p className="equipment-modal__upload-hint">JPG, PNG up to 5MB</p>
          </div>

          {/* Form Fields */}
          <div className="equipment-modal__form-group">
            <label className="equipment-modal__label">Equipment Name *</label>
            <input
              type="text"
              name="equipment_name"
              value={formData.equipment_name}
              onChange={handleChange}
              className="equipment-modal__input"
              placeholder="Enter equipment name"
              required
            />
          </div>

          <div className="equipment-modal__form-group">
            <label className="equipment-modal__label">
              Equipment Number *
              <span className="equipment-modal__hint"> (must be unique)</span>
            </label>
            <input
              type="text"
              name="equipment_number"
              value={formData.equipment_number}
              onChange={handleChange}
              className="equipment-modal__input"
              placeholder="Enter unique equipment number (e.g., EQ-001)"
              required
            />
          </div>

          <div className="equipment-modal__form-group">
            <label className="equipment-modal__label">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="equipment-modal__input"
              required
            >
              <option value="Exercise">Exercise</option>
              <option value="Aerobic">Aerobic</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="equipment-modal__error">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="equipment-modal__success">
              {success}
            </div>
          )}

          {/* Action Buttons */}
          <div className="equipment-modal__actions">
            <button
              type="button"
              onClick={onClose}
              className="equipment-modal__btn equipment-modal__btn--cancel"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="equipment-modal__btn equipment-modal__btn--save"
            >
              {saving
                ? equipment
                  ? 'Updating...'
                  : 'Adding...'
                : equipment
                ? 'Update Equipment'
                : 'Add Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EquipmentModal;
