
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import './AddAerobic.css';

const AddAerobic = () => {
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