import React, { useState } from "react";
import "../allUsers/AddUser.css";
import { registerUser } from "../../../services/users/userService.js"; // ✅ make sure path is correct

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    subscriptionType: "",
    dateOfBirth: "",
    dateOfJoining: "",
    gender: "",
    weight: "",
    healthInfo: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📝 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼 Handle image upload
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // 🚀 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });
      if (profileImage) {
        dataToSend.append("profileImage", profileImage);
      }

      const res = await registerUser(dataToSend);
      alert("✅ User registered successfully!");
      console.log("Response:", res);

      // Reset form after submit
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        phone: "",
        subscriptionType: "",
        dateOfBirth: "",
        dateOfJoining: "",
        gender: "",
        weight: "",
        healthInfo: "",
      });
      setProfileImage(null);
    } catch (err) {
      console.error("❌ Error registering user:", err);
      alert(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container">
      <h1 className="add-user-title">Add New Member</h1>

      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstame}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Country Code</label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
            >
              <option value="">Select country code</option>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Subscription Type</label>
            <select
              name="subscriptionType"
              value={formData.subscriptionType}
              onChange={handleChange}
              required
            >
              <option value="">Please select subscription type</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Please Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Weight (lbs)</label>
            <input
              type="number"
              name="weight"
              placeholder="Enter Weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Health Info</label>
            <textarea
              name="healthInfo"
              placeholder="Enter health information (any known conditions or injuries)"
              value={formData.healthInfo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="submit-section">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
