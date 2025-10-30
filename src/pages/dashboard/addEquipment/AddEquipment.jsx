import { useState } from 'react';
import { FiUpload, FiArrowLeft, FiImage } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { createEquipment } from '../../../services/equipment/equipmentService';
import './AddEquipment.css';

const AddEquipment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    equipment_name: '',
    equipment_number: '',
    category: 'Exercise'
  });

  const [equipmentImage, setEquipmentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('✅ Image selected:', file.name, file.type, file.size, 'bytes');
      setEquipmentImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.warn('⚠️ No file selected from input');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('equipment_name', formData.equipment_name);
      formDataToSend.append('equipment_number', formData.equipment_number);
      formDataToSend.append('category', formData.category);

      // Append image if selected
      if (equipmentImage) {
        console.log('📸 Appending image:', equipmentImage.name, equipmentImage.size, 'bytes');
        formDataToSend.append('equipment_image', equipmentImage);
      } else {
        console.warn('⚠️ No image selected');
      }

      // Debug: Log FormData contents
      console.log('📦 FormData contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], ':', pair[1]);
      }

      const response = await createEquipment(formDataToSend);

      if (response.success) {
        setSuccess('Equipment added successfully!');
        // Navigate back to equipment list based on category after 2 seconds
        setTimeout(() => {
          if (formData.category === 'Aerobic') {
            navigate('/dashboard/all_aerobic');
          } else {
            navigate('/dashboard/all_equipments');
          }
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to add equipment');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="addequip__wrapper">
      {/* Back Button */}
      <Link to="/dashboard/equipments" className="addequip__back-btn">
        <FiArrowLeft size={20} />
        Back
      </Link>

      {/* Form Container */}
      <div className="addequip__container">
        <div className="addequip__header">
          <h1 className="addequip__title">Add New Equipment</h1>
          <p className="addequip__subtitle">Add equipment to your gym inventory</p>
        </div>

        {error && (
          <div className="addequip__error">
            {error}
          </div>
        )}

        {success && (
          <div className="addequip__success">
            {success}
          </div>
        )}

        <form className="addequip__form-wrapper" onSubmit={handleSubmit}>
          {/* Image Section */}
          <div className="addequip__image-section">
            <div className="addequip__image-group">
              <div className="addequip__avatar">
                {imagePreview ? (
                  <img src={imagePreview} alt="Equipment Preview" />
                ) : (
                  <FiImage size={48} />
                )}
              </div>
              <div>
                <label className="addequip__upload-btn">
                  <FiUpload size={18} />
                  Upload Equipment Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="addequip__file-input"
                  />
                </label>
                <p className="addequip__upload-hint">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="addequip__form-grid">
            {/* Equipment Name */}
            <div className="addequip__form-group">
              <label className="addequip__label">Equipment Name *</label>
              <input
                type="text"
                name="equipment_name"
                value={formData.equipment_name}
                onChange={handleChange}
                className="addequip__input"
                placeholder="Enter equipment name"
                required
              />
            </div>

            {/* Equipment Number */}
            <div className="addequip__form-group">
              <label className="addequip__label">Equipment Number *</label>
              <input
                type="text"
                name="equipment_number"
                value={formData.equipment_number}
                onChange={handleChange}
                className="addequip__input"
                placeholder="Enter equipment number"
                required
              />
            </div>

            {/* Category */}
            <div className="addequip__form-group addequip__form-group--fullwidth">
              <label className="addequip__label">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="addequip__input"
                required
              >
                <option value="Exercise">Exercise</option>
                <option value="Aerobic">Aerobic</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="addequip__actions">
            <button
              type="button"
              onClick={handleCancel}
              className="addequip__btn addequip__btn--cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="addequip__btn addequip__btn--save"
            >
              {saving ? 'Adding...' : 'Add Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
