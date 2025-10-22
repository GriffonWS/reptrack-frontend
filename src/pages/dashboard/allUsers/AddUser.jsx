import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import './AddUser.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phone: '',
    subscriptionType: '',
    dateOfBirth: '',
    dateOfJoining: '',
    gender: '',
    weight: '',
    healthInfo: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '',
      phone: '',
      subscriptionType: '',
      dateOfBirth: '',
      dateOfJoining: '',
      gender: '',
      weight: '',
      healthInfo: ''
    });
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="adduser__container">
      <div className="adduser__wrapper">
        {/* Header */}
        <div className="adduser__header">
          <h1 className="adduser__title">Add New Member</h1>
          <p className="adduser__subtitle">Fill in the details to register a new member</p>
        </div>

        {/* Form */}
        <div className="adduser__form-container">
          <form className="adduser__form" onSubmit={handleSubmit}>
            <div className="adduser__form-grid">
              {/* First Name */}
              <div className="adduser__form-group">
                <label className="adduser__label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Last Name */}
              <div className="adduser__form-group">
                <label className="adduser__label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Email */}
              <div className="adduser__form-group">
                <label className="adduser__label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Country Code */}
              <div className="adduser__form-group">
                <label className="adduser__label">Country Code</label>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="adduser__input"
                >
                  <option value="">Select country code</option>
                  <option value="+91">+91 India</option>
                  <option value="+1">+1 USA</option>
                  <option value="+44">+44 UK</option>
                  <option value="+61">+61 Australia</option>
                </select>
              </div>

              {/* Phone Number */}
              <div className="adduser__form-group">
                <label className="adduser__label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Subscription Type */}
              <div className="adduser__form-group">
                <label className="adduser__label">Subscription Type</label>
                <select
                  name="subscriptionType"
                  value={formData.subscriptionType}
                  onChange={handleChange}
                  className="adduser__input"
                >
                  <option value="">Select subscription type</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div className="adduser__form-group">
                <label className="adduser__label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Date of Joining */}
              <div className="adduser__form-group">
                <label className="adduser__label">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Gender */}
              <div className="adduser__form-group">
                <label className="adduser__label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="adduser__input"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Weight */}
              <div className="adduser__form-group">
                <label className="adduser__label">Weight (lbs)</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Profile Image */}
              <div className="adduser__form-group">
                <label className="adduser__label">Profile Image</label>
                <label className="adduser__file-input">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="adduser__file-input-hidden"
                  />
                  <div className="adduser__file-label">
                    <FiUpload size={20} />
                    <span>Choose image</span>
                  </div>
                </label>
                {imagePreview && (
                  <div className="adduser__image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>

              {/* Health Info */}
              <div className="adduser__form-group adduser__form-group--full">
                <label className="adduser__label">Health Information</label>
                <textarea
                  name="healthInfo"
                  placeholder="Enter any known conditions, injuries, or allergies..."
                  value={formData.healthInfo}
                  onChange={handleChange}
                  className="adduser__textarea"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="adduser__actions">
              <button
                type="button"
                onClick={handleReset}
                className="adduser__btn adduser__btn--secondary"
              >
                Reset
              </button>
              <button
                type="submit"
                className="adduser__btn adduser__btn--primary"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;