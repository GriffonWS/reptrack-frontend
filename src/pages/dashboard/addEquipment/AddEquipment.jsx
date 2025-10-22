import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import './AddEquipment.css';

const AddEquipment = () => {
  const [formData, setFormData] = useState({
    equipmentName: '',
    serialNumber: ''
  });

  const [equipmentImage, setEquipmentImage] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEquipmentImage(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, equipmentImage);
  };

  return (
    <div className="addequip__container">
      <div className="addequip__wrapper">
        {/* Header */}
        <div className="addequip__header">
          <h1 className="addequip__title">Add New Exercise Equipment</h1>
        </div>

        {/* Form Container */}
        <div className="addequip__form-container">
          <div className="addequip__form-grid">
            {/* Equipment Name */}
            <div className="addequip__form-group">
              <label className="addequip__label">Equipment Name</label>
              <input
                type="text"
                name="equipmentName"
                placeholder="Enter Equipment name"
                value={formData.equipmentName}
                onChange={handleChange}
                className="addequip__input"
              />
            </div>

            {/* Serial Number */}
            <div className="addequip__form-group">
              <label className="addequip__label">Equipment Serial Number</label>
              <input
                type="text"
                name="serialNumber"
                placeholder="Enter Equipment Serial Number"
                value={formData.serialNumber}
                onChange={handleChange}
                className="addequip__input"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="addequip__upload-section">
            <label className="addequip__upload-label">Upload Equipment Image</label>
            <div className="addequip__file-input-wrapper">
              <label className="addequip__file-btn">
                <FiUpload size={16} />
                <span>Choose File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="addequip__file-input"
                />
              </label>
              <span className="addequip__file-name">{fileName}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="addequip__submit-section">
            <button
              type="button"
              onClick={handleSubmit}
              className="addequip__submit-btn"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddEquipment;