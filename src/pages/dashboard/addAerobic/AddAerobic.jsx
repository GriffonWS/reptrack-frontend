import { useState } from 'react';
import { FiUpload, FiArrowLeft, FiImage } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { createEquipment } from '../../../services/equipment/equipmentService';
import './AddAerobic.css';

const AddAerobic = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    equipment_name: '',
    equipment_number: '',
    category: 'Aerobic'
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
        setSuccess('Aerobic equipment added successfully!');
        setTimeout(() => {
          navigate('/dashboard/aerobic');
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
    <div className="addaero__wrapper">
      {/* Back Button */}
      <Link to="/dashboard/aerobic" className="addaero__back-btn">
        <FiArrowLeft size={20} />
        Back
      </Link>

      {/* Form Container */}
      <div className="addaero__container">
        <div className="addaero__header">
          <h1 className="addaero__title">Add New Aerobic Equipment</h1>
          <p className="addaero__subtitle">Add aerobic equipment to your gym inventory</p>
        </div>

        {error && (
          <div className="addaero__error">
            {error}
          </div>
        )}

        {success && (
          <div className="addaero__success">
            {success}
          </div>
        )}

        <form className="addaero__form-wrapper" onSubmit={handleSubmit}>
          {/* Image Section */}
          <div className="addaero__image-section">
            <div className="addaero__image-group">
              <div className="addaero__avatar">
                {imagePreview ? (
                  <img src={imagePreview} alt="Equipment Preview" />
                ) : (
                  <FiImage size={48} />
                )}
              </div>
              <div>
                <label className="addaero__upload-btn">
                  <FiUpload size={18} />
                  Upload Equipment Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="addaero__file-input"
                  />
                </label>
                <p className="addaero__upload-hint">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="addaero__form-grid">
            {/* Equipment Name */}
            <div className="addaero__form-group">
              <label className="addaero__label">Equipment Name *</label>
              <input
                type="text"
                name="equipment_name"
                value={formData.equipment_name}
                onChange={handleChange}
                className="addaero__input"
                placeholder="Enter equipment name"
                required
              />
            </div>

            {/* Equipment Number */}
            <div className="addaero__form-group">
              <label className="addaero__label">Equipment Number *</label>
              <input
                type="text"
                name="equipment_number"
                value={formData.equipment_number}
                onChange={handleChange}
                className="addaero__input"
                placeholder="Enter equipment number"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="addaero__actions">
            <button
              type="button"
              onClick={handleCancel}
              className="addaero__btn addaero__btn--cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="addaero__btn addaero__btn--save"
            >
              {saving ? 'Adding...' : 'Add Equipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAerobic;
