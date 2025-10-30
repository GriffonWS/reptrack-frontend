import React, { useState } from 'react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/user/userService';
import './AddUser.css';

const AddUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Subscription Type validation
    if (!formData.subscriptionType) {
      newErrors.subscriptionType = 'Subscription type is required';
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 10 || age > 100) {
        newErrors.dateOfBirth = 'Age must be between 10 and 100 years';
      }
    }

    // Date of Joining validation
    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = 'Date of joining is required';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Weight validation
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (formData.weight < 20 || formData.weight > 500) {
      newErrors.weight = 'Weight must be between 20 and 500 lbs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    try {
      setIsLoading(true);

      // Prepare data for submission
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subscriptionType: formData.subscriptionType,
        dateOfBirth: formData.dateOfBirth,
        dateOfJoining: formData.dateOfJoining,
        gender: formData.gender,
        weight: parseFloat(formData.weight),
        healthInfo: formData.healthInfo.trim() || 'No major health issues'
      };

      const response = await registerUser(userData, profileImage);

      if (response.success) {
        toast.success('Member added successfully!');
        handleReset();
        // Navigate to all users page after a short delay
        setTimeout(() => {
          navigate('/dashboard/all_users');
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to add member');
      console.error('Error adding member:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="adduser__wrapper">
      <Toaster position="top-right" />

      {/* Back Button */}
      <Link to="/dashboard/all_users" className="adduser__back-btn">
        <FiArrowLeft size={20} />
        Back
      </Link>

      {/* Form Container */}
      <div className="adduser__container">
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
                <label className="adduser__label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`adduser__input ${errors.firstName ? 'adduser__input--error' : ''}`}
                />
                {errors.firstName && <span className="adduser__error">{errors.firstName}</span>}
              </div>

              {/* Last Name */}
              <div className="adduser__form-group">
                <label className="adduser__label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`adduser__input ${errors.lastName ? 'adduser__input--error' : ''}`}
                />
                {errors.lastName && <span className="adduser__error">{errors.lastName}</span>}
              </div>

              {/* Email */}
              <div className="adduser__form-group">
                <label className="adduser__label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`adduser__input ${errors.email ? 'adduser__input--error' : ''}`}
                />
                {errors.email && <span className="adduser__error">{errors.email}</span>}
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
                <label className="adduser__label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`adduser__input ${errors.phone ? 'adduser__input--error' : ''}`}
                />
                {errors.phone && <span className="adduser__error">{errors.phone}</span>}
              </div>

              {/* Subscription Type */}
              <div className="adduser__form-group">
                <label className="adduser__label">Subscription Type *</label>
                <select
                  name="subscriptionType"
                  value={formData.subscriptionType}
                  onChange={handleChange}
                  className={`adduser__input ${errors.subscriptionType ? 'adduser__input--error' : ''}`}
                >
                  <option value="">Select subscription type</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                {errors.subscriptionType && <span className="adduser__error">{errors.subscriptionType}</span>}
              </div>

              {/* Date of Birth */}
              <div className="adduser__form-group">
                <label className="adduser__label">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`adduser__input ${errors.dateOfBirth ? 'adduser__input--error' : ''}`}
                />
                {errors.dateOfBirth && <span className="adduser__error">{errors.dateOfBirth}</span>}
              </div>

              {/* Date of Joining */}
              <div className="adduser__form-group">
                <label className="adduser__label">Date of Joining *</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  className={`adduser__input ${errors.dateOfJoining ? 'adduser__input--error' : ''}`}
                />
                {errors.dateOfJoining && <span className="adduser__error">{errors.dateOfJoining}</span>}
              </div>

              {/* Gender */}
              <div className="adduser__form-group">
                <label className="adduser__label">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`adduser__input ${errors.gender ? 'adduser__input--error' : ''}`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="adduser__error">{errors.gender}</span>}
              </div>

              {/* Weight */}
              <div className="adduser__form-group">
                <label className="adduser__label">Weight (lbs) *</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={`adduser__input ${errors.weight ? 'adduser__input--error' : ''}`}
                />
                {errors.weight && <span className="adduser__error">{errors.weight}</span>}
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
                disabled={isLoading}
              >
                Reset
              </button>
              <button
                type="submit"
                className="adduser__btn adduser__btn--primary"
                disabled={isLoading}
              >
                {isLoading ? 'Adding Member...' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;