import { getToken } from '../../utils/token';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all communication support queries
 * @returns {Promise} All support queries
 */
export const getAllSupportQueries = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/communicationsupports/get`, {
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
        throw new Error('Support queries not found.');
      } else {
        throw new Error(data.message || 'Failed to fetch support queries');
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
 * Get communication support queries by sender ID
 * @param {string} senderId - The sender ID to filter by
 * @returns {Promise} Support queries for the sender
 */
export const getSupportQueriesBySenderId = async (senderId) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    if (!senderId) {
      throw new Error('Sender ID is required');
    }

    const response = await fetch(`${API_URL}/communicationsupports/getBySenderId/${senderId}`, {
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
        throw new Error('No support queries found for this sender.');
      } else {
        throw new Error(data.message || 'Failed to fetch support queries');
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
 * Create a new communication support query
 * @param {Object} supportData - Object containing query, sender_id, and email
 * @returns {Promise} Created support query
 */
export const createSupportQuery = async (supportData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const { query, sender_id, email } = supportData;

    if (!query || !sender_id) {
      throw new Error('Query and sender_id are required');
    }

    const response = await fetch(`${API_URL}/communicationsupports/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, sender_id, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid support query data');
      } else if (response.status === 401) {
        throw new Error('Unauthorized. Please login again.');
      } else {
        throw new Error(data.message || 'Failed to create support query');
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
