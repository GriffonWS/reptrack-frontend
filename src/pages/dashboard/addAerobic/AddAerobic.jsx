
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './AddAerobic.css';
import { createEquipment } from '../../../services/equipment/equipmentService';

const AddAerobic = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    equipmentName: '',
    serialNumber: ''
  });

  const [equipmentImage, setEquipmentImage] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }

      setEquipmentImage(file);
      setFileName(file.name);
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.equipmentName.trim()) {
      setError('Equipment name is required');
      return false;
    }

    if (!formData.serialNumber.trim()) {
      setError('Serial number is required');
      return false;
    }

    if (!equipmentImage) {
      setError('Equipment image is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setSuccess('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Create FormData
      const formDataToSend = new FormData();
      formDataToSend.append('equipment_name', formData.equipmentName);
      formDataToSend.append('equipment_number', formData.serialNumber);
      formDataToSend.append('equipment_category', 'Aerobic');
      formDataToSend.append('equipment_image', equipmentImage);

      // Send to backend
      const response = await createEquipment(formDataToSend);

      if (response.success) {
        setSuccess('Aerobic equipment added successfully!');

        // Reset form
        setFormData({
          equipmentName: '',
          serialNumber: ''
        });
        setEquipmentImage(null);
        setFileName('No file chosen');

        // Redirect to all aerobic page after 2 seconds
        setTimeout(() => {
          navigate('/dashboard/all_aerobic');
        }, 2000);
      } else {
        setError(response.message || 'Failed to add equipment');
      }
    } catch (err) {
      setError(err.message || 'Failed to add equipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addaero__container">
      <div className="addaero__wrapper">
        {/* Header */}
        <div className="addaero__header">
          <h1 className="addaero__title">Add New Aerobic Equipment</h1>
        </div>

        {/* Form Container */}
        <div className="addaero__form-container">
          <div className="addaero__form-grid">
            {/* Equipment Name */}
            <div className="addaero__form-group">
              <label className="addaero__label">Equipment Name</label>
              <input
                type="text"
                name="equipmentName"
                placeholder="Enter Equipment name"
                value={formData.equipmentName}
                onChange={handleChange}
                className="addaero__input"
              />
            </div>

            {/* Serial Number */}
            <div className="addaero__form-group">
              <label className="addaero__label">Equipment Serial Number</label>
              <input
                type="text"
                name="serialNumber"
                placeholder="Enter Equipment Serial Number"
                value={formData.serialNumber}
                onChange={handleChange}
                className="addaero__input"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="addaero__upload-section">
            <label className="addaero__upload-label">Upload Equipment Image</label>
            <div className="addaero__file-input-wrapper">
              <label className="addaero__file-btn">
                <FiUpload size={16} />
                <span>Choose File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="addaero__file-input"
                />
              </label>
              <span className="addaero__file-name">{fileName}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="addaero__submit-section">
            <button
              type="button"
              onClick={handleSubmit}
              className="addaero__submit-btn"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddAerobic;