import React, { useState } from 'react';
import { FiEdit, FiMapPin, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profileData] = useState({
    firstName: 'Natasha',
    lastName: 'Khaleira',
    role: 'Admin',
    location: 'Leeds, United Kingdom',
    dateOfBirth: '12-10-1990',
    email: 'info@binary-fusion.com',
    phone: '(+62) 821 2554-5846',
    userRole: 'Admin',
    country: 'United Kingdom',
    city: 'Leeds, East London',
    postalCode: 'ERT 1254',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Natasha'
  });

  return (
    <div className="myprofile__wrapper">
      <div className="myprofile__container">
        {/* Title */}
        <div className="myprofile__header">
          <h1 className="myprofile__title">My Profile</h1>
          <p className="myprofile__subtitle">View and manage your profile information</p>
        </div>

        {/* Header Card */}
        <div className="myprofile__header-card">
          <div className="myprofile__header-content">
            <img
              src={profileData.image}
              alt="Profile"
              className="myprofile__avatar"
            />
            <div className="myprofile__header-info">
              <h2 className="myprofile__header-name">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="myprofile__header-role">{profileData.role}</p>
              <div className="myprofile__header-location">
                <FiMapPin size={16} />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="myprofile__section-card">
          <div className="myprofile__section-header">
            <h3 className="myprofile__section-title">Personal Information</h3>
            <Link to="/dashboard/profile/edit" className="myprofile__edit-btn" style={{textDecoration:"none"}}>
              <FiEdit size={18} />
              Edit
            </Link>
          </div>

          <div className="myprofile__info-grid">
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">First Name</label>
              <p className="myprofile__info-value">{profileData.firstName}</p>
            </div>
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Last Name</label>
              <p className="myprofile__info-value">{profileData.lastName}</p>
            </div>
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Date of Birth</label>
              <p className="myprofile__info-value">{profileData.dateOfBirth}</p>
            </div>
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Email Address</label>
              <p className="myprofile__info-value">{profileData.email}</p>
            </div>
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Phone Number</label>
              <p className="myprofile__info-value">{profileData.phone}</p>
            </div>
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">User Role</label>
              <p className="myprofile__info-value">{profileData.userRole}</p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        
      </div>
    </div>
  );
};
export default Profile;