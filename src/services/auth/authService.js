const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/gym-owner/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    // Handle network errors or non-JSON responses
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error('Invalid response from server. Please try again later.');
    }

    if (!response.ok) {
      // Handle specific HTTP status codes
      if (response.status === 401) {
        throw new Error(data.message || 'Invalid credentials. Please check your Unique ID and password.');
      } else if (response.status === 404) {
        throw new Error('Service not found. Please contact support.');
      } else if (response.status === 500) {
        throw new Error('Server error. Please try again later.');
      } else if (response.status === 429) {
        throw new Error('Too many login attempts. Please try again later.');
      } else {
        throw new Error(data.message || 'Login failed. Please try again.');
      }
    }

    // Validate response data
    if (!data.success || !data.data || !data.data.token) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Failed to fetch');
    }

    // Re-throw custom errors
    throw error;
  }
};
