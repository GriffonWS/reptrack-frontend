import React, { useState, useEffect } from 'react';
import { FiEdit, FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';
import './Profile.css';
import { Link } from 'react-router-dom';
import { getGymOwnerByToken } from '../../../services/gymOwner/gymOwnerService.js';
import Loader from '../../../components/Loader/Loader';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGymOwnerProfile = async () => {
      try {
        setLoading(true);
        const response = await getGymOwnerByToken();

        if (response.success && response.data) {
          setProfileData(response.data);
        } else {
          setError(response.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching profile');
        console.error('Error fetching gym owner profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGymOwnerProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="myprofile__wrapper">
        <div className="myprofile__container">
          <div className="myprofile__error">{error}</div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="myprofile__wrapper">
        <div className="myprofile__container">
          <div className="myprofile__error">No profile data available</div>
        </div>
      </div>
    );
  }

  // Avatar and Gym Logo
  const avatarUrl = profileData.profileImage 
    ? profileData.profileImage 
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.ownerName || 'GymOwner'}`;
    
  const gymLogoUrl = profileData.gymLogo 
    ? profileData.gymLogo 
    : 'https://via.placeholder.com/100x100?text=Gym+Logo';

  return (
    <div className="myprofile__wrapper">
      <div className="myprofile__container">
        {/* Title */}
        <div className="myprofile__header">
          <h1 className="myprofile__title">My Gym Profile</h1>
          <p className="myprofile__subtitle">View and manage your gym details</p>
        </div>

        {/* Header Card */}
        <div className="myprofile__header-card">
          <div className="myprofile__header-content">
            <img src={avatarUrl} alt="Profile" className="myprofile__avatar" />
            <div className="myprofile__header-info">
              <h2 className="myprofile__header-name">{profileData.ownerName}</h2>
              <p className="myprofile__header-role">{profileData.gymName}</p>
              <div className="myprofile__header-location">
                <FiMail size={16} />
                <span>{profileData.email}</span>
              </div>
            </div>
          </div>
          <img src={gymLogoUrl} alt="Gym Logo" className="myprofile__gymlogo" />
        </div>

        {/* Personal Information Section */}
        <div className="myprofile__section-card">
          <div className="myprofile__section-header">
            <h3 className="myprofile__section-title">Personal & Gym Information</h3>
            <Link to="/dashboard/profile/edit" className="myprofile__edit-btn" style={{ textDecoration: "none" }}>
              <FiEdit size={18} />
              Edit
            </Link>
          </div>

          <div className="myprofile__info-grid">
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Owner Name</label>
              <p className="myprofile__info-value">{profileData.ownerName || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Gym Name</label>
              <p className="myprofile__info-value">{profileData.gymName || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Email</label>
              <p className="myprofile__info-value">{profileData.email || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Phone Number</label>
              <p className="myprofile__info-value">
                <FiPhone size={14} style={{ marginRight: '5px' }} />
                {profileData.phoneNumber || '-'}
              </p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Address</label>
              <p className="myprofile__info-value">
                <FiMapPin size={14} style={{ marginRight: '5px' }} />
                {profileData.address || '-'}
              </p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Subscription Type</label>
              <p className="myprofile__info-value">{profileData.subscriptionType || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Unique ID</label>
              <p className="myprofile__info-value">{profileData.uniqueId || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Status</label>
              <p className="myprofile__info-value">{profileData.active ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
