import React, { useState } from 'react';
import { FiArrowLeft, FiUser, FiUpload } from 'react-icons/fi';
import './EditUserProfile.css';

const EditUserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    phone: '+91 9876543210',
    email: 'john@example.com',
    gender: 'Male',
    weight: '75',
    healthInfo: 'No known allergies',
    subscriptionType: 'Premium',
    dateOfBirth: '1995-05-20',
    dateOfJoining: '2024-01-15',
    status: true
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    console.log('Edit cancelled');
  };

  return (
    <div className="editprofile__wrapper">
      {/* Back Button */}
      <button className="editprofile__back-btn">
        <FiArrowLeft size={20} />
        Back
      </button>

      {/* Form Container */}
      <div className="editprofile__container">
        <div className="editprofile__header">
          <h1 className="editprofile__title">Edit Member Profile</h1>
          <p className="editprofile__subtitle">Update member information</p>
        </div>

        <div className="editprofile__form-wrapper">
          {/* Image Section */}
          <div className="editprofile__image-section">
            <div className="editprofile__avatar">
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <FiUser size={48} />
              )}
            </div>
            <label className="editprofile__upload-btn">
              <FiUpload size={18} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="editprofile__file-input"
              />
            </label>
            <p className="editprofile__upload-hint">JPG, PNG up to 5MB</p>
          </div>

          {/* Form Grid */}
          <div className="editprofile__form-grid">
            {/* First Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter last name"
              />
            </div>

            {/* Phone */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter phone number"
              />
            </div>

            {/* Email */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter email address"
              />
            </div>

            {/* Gender */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="editprofile__input"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Weight */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter weight"
              />
            </div>

            {/* Health Info */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Health Information</label>
              <input
                type="text"
                name="healthInfo"
                value={formData.healthInfo}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter health info"
              />
            </div>

            {/* Subscription Type */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Subscription Type</label>
              <input
                type="text"
                name="subscriptionType"
                value={formData.subscriptionType}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter subscription type"
              />
            </div>

            {/* Date of Birth */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="editprofile__input"
              />
            </div>

            {/* Date of Joining */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Date of Joining</label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="editprofile__input"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="editprofile__actions">
            <button
              type="button"
              onClick={handleCancel}
              className="editprofile__btn editprofile__btn--cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="editprofile__btn editprofile__btn--save"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditUserProfile;