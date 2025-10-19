import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaUpload } from "react-icons/fa";
import { getUserById, updateUserWithImage } from "../../../services/users/userService.js";
import "./EditUserProfile.css";

const EditUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    weight: "",
    healthInfo: "",
    subscriptionType: "",
    dateOfBirth: "",
    dateOfJoining: "",
    status: true,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await getUserById(id);
        const data = res?.data;
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          email: data.email || "",
          gender: data.gender || "",
          weight: data.weight || "",
          healthInfo: data.healthInfo || "",
          subscriptionType: data.subscriptionType || "",
          dateOfBirth: data.dateOfBirth || "",
          dateOfJoining: data.dateOfJoining || "",
          status: data.status ?? true,
        });
        setPreviewImage(data.profileImage || null);
      } catch (error) {
        console.error("❌ Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => dataToSend.append(key, formData[key]));
      if (profileImage) dataToSend.append("profileImage", profileImage);

      await updateUserWithImage(id, dataToSend);
      navigate(`/dashboard/users/${id}/edit`);
    } catch (error) {
      console.error("❌ Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editprofile__wrapper">
      {/* Topbar */}
      <div className="editprofile__topbar">
        <button className="editprofile__backbtn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <form className="editprofile__form" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="editprofile__image-section">
          <div className="editprofile__avatar">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <FaUser size={40} />
            )}
          </div>
          <label className="editprofile__upload-label">
            <FaUpload /> Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="editprofile__grid">
          <div className="editprofile__field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="editprofile__field">
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Health Info</label>
            <input
              type="text"
              name="healthInfo"
              value={formData.healthInfo}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Subscription Type</label>
            <input
              type="text"
              name="subscriptionType"
              value={formData.subscriptionType}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="editprofile__field">
            <label>Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="editprofile__btn-row">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;
