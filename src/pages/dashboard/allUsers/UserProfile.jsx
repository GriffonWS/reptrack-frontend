import React, { useState } from 'react';
import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiEdit,
  FiTrash
} from 'react-icons/fi';
import './UserProfile.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [selectedUser] = useState({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    countryCode: '+91',
    subscriptionType: 'Premium',
    dateOfJoining: '2024-01-15',
    dateOfBirth: '1995-05-20',
    gender: 'Male',
    weight: '75',
    healthInfo: 'No known allergies',
    uniqueId: 'MEM001',
    status: true,
    profileImage: null
  });

  return (
    <div className="profile__wrapper">
      {/* Back Button */}
      <button className="profile__back-btn">
        <FiArrowLeft size={20} />
        Back
      </button>

      {/* Header Card */}
      <div className="profile__header">
        <div className="profile__header-left">
          <div className="profile__avatar">
            {selectedUser.profileImage ? (
              <img src={selectedUser.profileImage} alt="Profile" />
            ) : (
              <FiUser size={48} />
            )}
          </div>
          <div className="profile__header-info">
            <h1 className="profile__name">
              {selectedUser.firstName} {selectedUser.lastName}
            </h1>
            <p className="profile__member-id">Member ID: {selectedUser.uniqueId}</p>
            <span className={`profile__status profile__status--${selectedUser.status ? 'active' : 'inactive'}`}>
              {selectedUser.status ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="profile__header-actions">
          <Link to="/dashboard/user/:id/edit" className="profile__btn profile__btn--edit" style={{textDecoration:"none"}}>
            <FiEdit size={18} />
            Edit
          </Link>
          <button className="profile__btn profile__btn--delete">
            <FiTrash size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="profile__section">
        <h3 className="profile__section-title">Contact Information</h3>
        <div className="profile__info-grid">
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiPhone size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Mobile Number</label>
              <p className="profile__info-value">{selectedUser.phone || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiMail size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Email Address</label>
              <p className="profile__info-value">{selectedUser.email || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Details */}
      <div className="profile__section">
        <h3 className="profile__section-title">Membership Details</h3>
        <div className="profile__info-grid">
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiCalendar size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Subscription Type</label>
              <p className="profile__info-value">{selectedUser.subscriptionType || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiCalendar size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Date of Joining</label>
              <p className="profile__info-value">{selectedUser.dateOfJoining || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiCalendar size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Date of Birth</label>
              <p className="profile__info-value">{selectedUser.dateOfBirth || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="profile__section">
        <h3 className="profile__section-title">Personal Information</h3>
        <div className="profile__info-grid">
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiUser size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Gender</label>
              <p className="profile__info-value">{selectedUser.gender || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiUser size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Weight (lbs)</label>
              <p className="profile__info-value">{selectedUser.weight || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiUser size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Health Information</label>
              <p className="profile__info-value">{selectedUser.healthInfo || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Credentials */}
      <div className="profile__section">
        <h3 className="profile__section-title">Login Credentials</h3>
        <div className="profile__info-grid">
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiUser size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Unique ID</label>
              <p className="profile__info-value">{selectedUser.uniqueId || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiPhone size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Phone</label>
              <p className="profile__info-value">{selectedUser.phone || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;