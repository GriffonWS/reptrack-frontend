import { getToken, removeToken } from './token';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Enhanced fetch wrapper that handles token expiration
 * Automatically redirects to login on 401 (token expired) errors
 */
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const token = getToken();

    if (!token) {
      removeToken();
      window.location.href = '/login';
      throw new Error('No authentication token found');
    }

    // Merge default headers with provided options
    const config = {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    // Handle token expiration (401 Unauthorized)
    if (response.status === 401) {
      removeToken();
      window.location.href = '/login';
      throw new Error(data.message || 'Session expired. Please login again.');
    }

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    // If it's a token expiration error, ensure we redirect
    if (error.message.includes('Token expired') || error.message.includes('Session expired')) {
      removeToken();
      window.location.href = '/login';
    }
    throw error;
  }
};
