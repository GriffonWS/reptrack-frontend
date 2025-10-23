import React, { useState, useEffect } from 'react';
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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getUserDetails, deleteUser } from '../../../services/user/userService';
import Loader from '../../../components/Loader/Loader';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getUserDetails(id);

      if (response.success && response.data) {
        // response.data is an array, get the first item
        const userData = Array.isArray(response.data) ? response.data[0] : response.data;
        setSelectedUser(userData);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch user details');
      console.error('Error fetching user details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard/all_users');
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUser.firstName} ${selectedUser.lastName}? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      const response = await deleteUser(selectedUser.id);

      if (response.success) {
        alert('User deleted successfully');
        navigate('/dashboard/all_users');
      }
    } catch (err) {
      alert(err.message || 'Failed to delete user');
      console.error('Error deleting user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile__wrapper">
        <Loader />
      </div>
    );
  }

  if (error || !selectedUser) {
    return (
      <div className="profile__wrapper">
        <button className="profile__back-btn" onClick={handleBack}>
          <FiArrowLeft size={20} />
          Back
        </button>
        <div style={{
          padding: '20px',
          backgroundColor: '#fff5f5',
          color: '#c53030',
          border: '1px solid #fc8181',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          {error || 'User not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="profile__wrapper">
      {/* Back Button */}
      <button className="profile__back-btn" onClick={handleBack}>
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
            <span className={`profile__status profile__status--${selectedUser.active ? 'active' : 'inactive'}`}>
              {selectedUser.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="profile__header-actions">
          <Link to={`/dashboard/user/${selectedUser.id}/edit`} className="profile__btn profile__btn--edit" style={{textDecoration:"none"}}>
            <FiEdit size={18} />
            Edit
          </Link>
          <button className="profile__btn profile__btn--delete" onClick={handleDelete}>
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