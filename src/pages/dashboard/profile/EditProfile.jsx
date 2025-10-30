import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./EditProfile.css";
import { getGymOwnerByToken, updateGymOwner } from "../../../services/gymOwner/gymOwnerService";
import Loader from "../../../components/Loader/Loader";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    gymName: "",
    email: "",
    uniqueId: "",
    phoneNumber: "",
    address: "",
    profileImage: "",
    gymLogo: "",
  });

  const [preview, setPreview] = useState({
    profileImage: "",
    gymLogo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getGymOwnerByToken();
        if (response.success && response.data) {
          const data = response.data;
          setFormData({
            ownerName: data.ownerName || "",
            gymName: data.gymName || "",
            email: data.email || "",
            uniqueId: data.uniqueId || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            profileImage: data.profileImage || "",
            gymLogo: data.gymLogo || "",
          });
          setPreview({
            profileImage: data.profileImage || "",
            gymLogo: data.gymLogo || "",
          });
        } else {
          setError("Failed to load profile data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle text field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setFormData({ ...formData, [name]: file });
      setPreview({ ...preview, [name]: URL.createObjectURL(file) });
    }
  };

  // ✅ Save updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const updatedForm = new FormData();
      
      // ⚠️ IMPORTANT: Append ALL text fields (backend expects them)
      updatedForm.append("ownerName", formData.ownerName || "");
      updatedForm.append("gymName", formData.gymName || "");
      updatedForm.append("phoneNumber", formData.phoneNumber || "");
      updatedForm.append("address", formData.address || "");
      
      // Append files only if they are new File objects
      if (formData.profileImage instanceof File) {
        updatedForm.append("profile_image", formData.profileImage);
      }
      if (formData.gymLogo instanceof File) {
        updatedForm.append("gym_logo", formData.gymLogo);
      }

      const response = await updateGymOwner(updatedForm);
      if (response.success) {
        alert("Profile updated successfully!");
        // Refresh data
        if (response.data) {
          setFormData({
            ownerName: response.data.ownerName || "",
            gymName: response.data.gymName || "",
            email: response.data.email || "",
            uniqueId: response.data.uniqueId || "",
            phoneNumber: response.data.phoneNumber || "",
            address: response.data.address || "",
            profileImage: response.data.profileImage || "",
            gymLogo: response.data.gymLogo || "",
          });
          setPreview({
            profileImage: response.data.profileImage || "",
            gymLogo: response.data.gymLogo || "",
          });
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ✅ Reset form to original fetched data
  const handleCancel = () => {
    window.location.reload();
  };

  if (loading) return <Loader />;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="editprofile__wrapper">
      {/* Back Button */}
      <Link to="/dashboard/profile" className="editprofile__back-btn">
        <FiArrowLeft size={20} />
        Back
      </Link>

      {/* Form Container */}
      <div className="editprofile__container">
        <div className="editprofile__header">
          <h1 className="editprofile__title">Edit Gym Owner Profile</h1>
          <p className="editprofile__subtitle">Update your gym information</p>
        </div>

        <form className="editprofile__form-wrapper" onSubmit={handleSubmit}>
          {/* Image Section */}
          <div className="editprofile__image-section">
            <div className="editprofile__image-group">
              <div className="editprofile__avatar">
                {preview.profileImage ? (
                  <img src={preview.profileImage} alt="Profile" />
                ) : (
                  <FiUser size={48} />
                )}
              </div>
              <div>
                <label className="editprofile__upload-btn">
                  <FiUpload size={18} />
                  Upload Profile Image
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="editprofile__file-input"
                  />
                </label>
                <p className="editprofile__upload-hint">JPG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="editprofile__image-group">
              <div className="editprofile__avatar">
                {preview.gymLogo ? (
                  <img src={preview.gymLogo} alt="Gym Logo" />
                ) : (
                  <FiUser size={48} />
                )}
              </div>
              <div>
                <label className="editprofile__upload-btn">
                  <FiUpload size={18} />
                  Upload Gym Logo
                  <input
                    type="file"
                    name="gymLogo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="editprofile__file-input"
                  />
                </label>
                <p className="editprofile__upload-hint">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="editprofile__form-grid">
            {/* Owner Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter owner name"
                required
              />
            </div>

            {/* Gym Name */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Gym Name *</label>
              <input
                type="text"
                name="gymName"
                value={formData.gymName}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter gym name"
                required
              />
            </div>

            {/* Email */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Email</label>
              <input
                type="text"
                value={formData.email}
                disabled
                className="editprofile__input"
              />
            </div>

            {/* Unique ID */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Unique ID</label>
              <input
                type="text"
                value={formData.uniqueId}
                disabled
                className="editprofile__input"
              />
            </div>

            {/* Phone Number */}
            <div className="editprofile__form-group">
              <label className="editprofile__label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="editprofile__input"
                placeholder="Enter phone number"
              />
            </div>

            {/* Address */}
            <div className="editprofile__form-group editprofile__form-group--fullwidth">
              <label className="editprofile__label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="editprofile__input"
                placeholder="Enter address"
              ></textarea>
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
              type="submit"
              disabled={saving}
              className="editprofile__btn editprofile__btn--save"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;