import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaWeight,
  FaHeartbeat,
  FaIdCard,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import {
  getUserById,
  deleteUserById
} from "../../../services/users/userService.js";
import "../allUsers/UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("📥 Fetching for ID:", id);
        setLoading(true);
        const response = await getUserById(id);
        console.log("🧾 Full API response:", response);
        setUserData(response?.data || null);
      } catch (err) {
        console.error("❌ Failed to load user data:", err);
        setError(err.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`
    );
    if (!confirmed) return;

    try {
      await deleteUserById(id);
      alert("✅ User deleted successfully!");
      navigate("/dashboard/all_users");
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  if (loading) {
    return <div className="userprofile__loading">Loading profile...</div>;
  }

  if (error || !userData) {
    return (
      <div className="userprofile__error">
        <p>{error || "User not found"}</p>
        <button onClick={() => navigate(-1)} className="userprofile__backbtn">
          <FaArrowLeft /> Back
        </button>
      </div>
    );
  }

  return (
    <div className="userprofile__wrapper">
      {/* Top Bar */}
      <div className="userprofile__topbar">
        <button className="userprofile__backbtn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Header Section */}
      <div className="userprofile__header-card">
        <div className="userprofile__header-left">
          <div className="userprofile__avatar">
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="userprofile__avatar-img"
              />
            ) : (
              <FaUser size={40} />
            )}
          </div>
          <div>
            <h2 className="userprofile__name">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="userprofile__id">Member ID: {userData.uniqueId}</p>
            <span
              className={`userprofile__status ${
                userData.status ? "active" : "inactive"
              }`}
            >
              {userData.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="userprofile__action-btns">
          <button
            className="userprofile__edit-btn"
            onClick={() => navigate(`/dashboard/users/${id}/edit`)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="userprofile__delete-btn"
            onClick={handleDelete}
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="userprofile__section-card">
        <h3 className="userprofile__section-title">Contact Information</h3>
        <div className="userprofile__info-grid">
          <div className="userprofile__info-item">
            <FaPhone className="userprofile__icon" />
            <div>
              <label>Mobile Number</label>
              <p>{userData.phone || "—"}</p>
            </div>
          </div>
          <div className="userprofile__info-item">
            <FaEnvelope className="userprofile__icon" />
            <div>
              <label>Email</label>
              <p>{userData.email || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Details */}
      <div className="userprofile__section-card">
        <h3 className="userprofile__section-title">Membership Details</h3>
        <div className="userprofile__info-grid">
          <div className="userprofile__info-item">
            <FaIdCard className="userprofile__icon" />
            <div>
              <label>Subscription Type</label>
              <p>{userData.subscriptionType || "—"}</p>
            </div>
          </div>
          <div className="userprofile__info-item">
            <FaCalendarAlt className="userprofile__icon" />
            <div>
              <label>Date of Joining</label>
              <p>{userData.dateOfJoining || "—"}</p>
            </div>
          </div>
          <div className="userprofile__info-item">
            <FaBirthdayCake className="userprofile__icon" />
            <div>
              <label>Date of Birth</label>
              <p>{userData.dateOfBirth || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="userprofile__section-card">
        <h3 className="userprofile__section-title">Personal Information</h3>
        <div className="userprofile__info-grid">
          <div className="userprofile__info-item">
            <FaVenusMars className="userprofile__icon" />
            <div>
              <label>Gender</label>
              <p>{userData.gender || "—"}</p>
            </div>
          </div>
          <div className="userprofile__info-item">
            <FaWeight className="userprofile__icon" />
            <div>
              <label>Weight</label>
              <p>{userData.weight || "—"}</p>
            </div>
          </div>
          <div className="userprofile__info-item">
            <FaHeartbeat className="userprofile__icon" />
            <div>
              <label>Health Info</label>
              <p>{userData.healthInfo || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Credentials */}
      <div className="userprofile__section-card">
        <h3 className="userprofile__section-title">Login Credentials</h3>
        <div className="userprofile__info-grid">
          <div className="userprofile__info-item">
            <FaIdCard className="userprofile__icon" />
            <div>
              <label>Unique ID</label>
              <p>{userData.uniqueId || "—"}</p>
            </div>
          </div>
          <div className="userprofile__info-item">
            <FaPhone className="userprofile__icon" />
            <div>
              <label>Phone</label>
              <p>{userData.phone || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
