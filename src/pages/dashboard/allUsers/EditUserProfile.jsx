import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiUser, FiUpload } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../../../services/user/userService';
import Loader from '../../../components/Loader/Loader';
import './EditUserProfile.css';

const EditUserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: '',
    weight: '',
    healthInfo: '',
    subscriptionType: '',
    dateOfBirth: '',
    dateOfJoining: '',
    active: true
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getUserDetails(id);
      console.log(response)

      if (response.success && response.data) {
        const user = response.data[0];

        // Format dates for input fields (YYYY-MM-DD)
        const formatDate = (dateString) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };

        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
          email: user.email || '',
          gender: user.gender || '',
          weight: user.weight?.toString() || '',
          healthInfo: user.healthInfo || '',
          subscriptionType: user.subscriptionType || '',
          dateOfBirth: formatDate(user.dateOfBirth),
          dateOfJoining: formatDate(user.dateOfJoining),
          active: user.active ?? true
        });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch user details');
      console.error('Error fetching user:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      setLoading(true);

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
        healthInfo: formData.healthInfo.trim() || 'No major health issues',
        active: formData.active
      };

      const response = await updateUser(id, userData);

      if (response.success) {
        toast.success('User updated successfully!');
        // Navigate back to user profile after a short delay
        setTimeout(() => {
          navigate(`/dashboard/user/${id}`);
        }, 1500);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update user');
      console.error('Error updating user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/dashboard/user/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="editprofile__wrapper">
      <Toaster position="top-right" />
      {/* Back Button */}
      <button className="editprofile__back-btn" onClick={handleCancel}>
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
              <label className="editprofile__label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`editprofile__input ${errors.firstName ? 'editprofile__input--error' : ''}`}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="editprofile__error">{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`editprofile__input ${errors.lastName ? 'editprofile__input--error' : ''}`}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="editprofile__error">{errors.lastName}</span>}
            </div>

            {/* Phone */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`editprofile__input ${errors.phone ? 'editprofile__input--error' : ''}`}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="editprofile__error">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`editprofile__input ${errors.email ? 'editprofile__input--error' : ''}`}
                placeholder="Enter email address"
              />
              {errors.email && <span className="editprofile__error">{errors.email}</span>}
            </div>

            {/* Gender */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`editprofile__input ${errors.gender ? 'editprofile__input--error' : ''}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="editprofile__error">{errors.gender}</span>}
            </div>

            {/* Weight */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Weight (lbs) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={`editprofile__input ${errors.weight ? 'editprofile__input--error' : ''}`}
                placeholder="Enter weight"
              />
              {errors.weight && <span className="editprofile__error">{errors.weight}</span>}
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
              <label className="editprofile__label">Subscription Type *</label>
              <select
                name="subscriptionType"
                value={formData.subscriptionType}
                onChange={handleChange}
                className={`editprofile__input ${errors.subscriptionType ? 'editprofile__input--error' : ''}`}
              >
                <option value="">Select subscription type</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
              {errors.subscriptionType && <span className="editprofile__error">{errors.subscriptionType}</span>}
            </div>

            {/* Date of Birth */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`editprofile__input ${errors.dateOfBirth ? 'editprofile__input--error' : ''}`}
              />
              {errors.dateOfBirth && <span className="editprofile__error">{errors.dateOfBirth}</span>}
            </div>

            {/* Date of Joining */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Date of Joining *</label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className={`editprofile__input ${errors.dateOfJoining ? 'editprofile__input--error' : ''}`}
              />
              {errors.dateOfJoining && <span className="editprofile__error">{errors.dateOfJoining}</span>}
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