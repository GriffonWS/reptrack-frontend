
import React, { useState } from 'react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import './EditProfile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Natasha',
    lastName: 'Khaleira',
    email: 'info@binary-fusion.com',
    role: 'Admin'
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Natasha');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData, profileImage);
  };

  const handleCancel = () => {
    console.log('Edit cancelled');
  };

  return (
    <div className="editadmin__wrapper">
      {/* Back Button */}
      <button className="editadmin__back-btn">
        <FiArrowLeft size={20} />
        Back
      </button>

      {/* Container */}
      <div className="editadmin__container">
        {/* Header */}
        <div className="editadmin__header">
          <h1 className="editadmin__title">Edit Admin Profile</h1>
          <p className="editadmin__subtitle">Update your profile information</p>
        </div>

        {/* Form Wrapper */}
        <div className="editadmin__form-wrapper">
          {/* Image Section */}
          <div className="editadmin__image-section">
            <div className="editadmin__avatar">
              <img src={previewImage} alt="Profile" />
            </div>
            <label className="editadmin__upload-btn">
              <FiUpload size={18} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="editadmin__file-input"
              />
            </label>
            <p className="editadmin__upload-hint">JPG, PNG up to 5MB</p>
          </div>

          {/* Form Grid */}
          <div className="editadmin__form-grid">
            {/* First Name */}
            <div className="editadmin__form-group">
              <label className="editadmin__label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="editadmin__input"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div className="editadmin__form-group">
              <label className="editadmin__label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="editadmin__input"
                placeholder="Enter last name"
              />
            </div>

            {/* Email (Read-only) */}
            <div className="editadmin__form-group">
              <label className="editadmin__label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="editadmin__input editadmin__input--readonly"
                disabled
              />
              <p className="editadmin__helper-text">Email cannot be changed</p>
            </div>

            {/* Role */}
            <div className="editadmin__form-group">
              <label className="editadmin__label">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="editadmin__input"
                placeholder="Enter role"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="editadmin__actions">
            <button
              type="button"
              onClick={handleCancel}
              className="editadmin__btn editadmin__btn--cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="editadmin__btn editadmin__btn--save"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};
export default EditProfile;