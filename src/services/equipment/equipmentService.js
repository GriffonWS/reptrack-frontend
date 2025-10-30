import { getToken, removeToken } from '../../utils/token';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all equipment
 * @returns {Promise} All equipment
 */
export const getAllEquipments = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/equipment/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Failed to fetch equipments');
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
 * Get equipment by category
 * @param {string} category - Category name (Aerobic or Exercise)
 * @returns {Promise} Filtered equipment by category
 */
export const getEquipmentByCategory = async (category) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    if (!category) {
      throw new Error('Category is required');
    }

    const response = await fetch(`${API_URL}/equipment/category?category=${encodeURIComponent(category)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 400) {
        throw new Error(data.message || 'Invalid category');
      }
      throw new Error(data.message || 'Failed to fetch equipment by category');
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
 * Get single equipment by ID
 * @param {number} id - Equipment ID
 * @returns {Promise} Equipment details
 */
export const getEquipmentById = async (id) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/equipment/get/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Equipment not found.');
      }
      throw new Error(data.message || 'Failed to fetch equipment');
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
 * Create new equipment
 * @param {FormData} formData - Form data containing equipment details and image
 * @returns {Promise} Created equipment
 */
export const createEquipment = async (formData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/equipment/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData, browser will set it with boundary
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid equipment data');
      } else if (response.status === 401) {
        throw new Error('Unauthorized. Please login again.');
      }
      throw new Error(data.message || 'Failed to create equipment');
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
 * Update equipment
 * @param {number} id - Equipment ID
 * @param {FormData} formData - Form data containing updated equipment details
 * @returns {Promise} Updated equipment
 */
export const updateEquipment = async (id, formData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/equipment/update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid equipment data');
      } else if (response.status === 401) {
        throw new Error('Unauthorized. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Equipment not found.');
      }
      throw new Error(data.message || 'Failed to update equipment');
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
 * Delete equipment
 * @param {number} id - Equipment ID
 * @returns {Promise} Deletion result
 */
export const deleteEquipment = async (id) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/equipment/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 404) {
        throw new Error('Equipment not found.');
      }
      throw new Error(data.message || 'Failed to delete equipment');
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
