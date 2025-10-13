import React, { useState } from 'react'
import { FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import './Profile.css'
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
  })

  return (
    <div className="myprofile__wrapper">

      <div className="myprofile__container">
        <h1 className="myprofile__title">My Profile</h1>

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
              <p className="myprofile__header-location">
                <FaMapMarkerAlt size={14} />
                {profileData.location}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="myprofile__section-card">
          <div className="myprofile__section-header">
            <h3 className="myprofile__section-title">Personal Information</h3>
            <button className="myprofile__edit-btn">
              <FaEdit size={16} />
              Edit
            </button>
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
        <div className="myprofile__section-card">
          <div className="myprofile__section-header">
            <h3 className="myprofile__section-title">Address</h3>
            <button className="myprofile__edit-btn">
              <FaEdit size={16} />
              Edit
            </button>
          </div>

          <div className="myprofile__info-grid-2col">
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Country</label>
              <p className="myprofile__info-value">{profileData.country}</p>
            </div>
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">City</label>
              <p className="myprofile__info-value">{profileData.city}</p>
            </div>
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Postal Code</label>
              <p className="myprofile__info-value">{profileData.postalCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile