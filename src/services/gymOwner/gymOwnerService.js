import { getToken } from '../../utils/token';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get gym owner data by token
 * @returns {Promise} Gym owner data
 */
export const getGymOwnerByToken = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/by-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Gym owner not found.');
      } else {
        throw new Error(data.message || 'Failed to fetch gym owner data');
      }
    }

    // Validate response data
    if (!data.success || !data.data) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    // Re-throw custom errors
    throw error;
  }
};

/**
 * Update gym owner profile
 * @param {FormData} formData - Form data with profile updates
 * @returns {Promise} Updated gym owner data
 */
export const updateGymOwner = async (formData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Gym owner not found.');
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    }

    if (!data.success || !data.data) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
};

/**
 * Change gym owner password
 * @param {Object} passwordData - Object containing oldPassword, newPassword, confirmPassword
 * @returns {Promise} Response data
 */
export const changePassword = async (passwordData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid password data');
      } else if (response.status === 401) {
        throw new Error('Unauthorized. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Gym owner not found.');
      } else {
        throw new Error(data.message || 'Failed to change password');
      }
    }

    if (!data.success) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
};

/**
 * Logout gym owner
 * @returns {Promise} Response data
 */
export const logout = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Gym owner not found.');
      } else {
        throw new Error(data.message || 'Failed to logout');
      }
    }

    if (!data.success) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
};
