import { removeToken } from '../../utils/token';

const API_URL = import.meta.env.VITE_API_URL;

export const getAdminProfile = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Failed to fetch admin profile');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateAdminProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Failed to update admin profile');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const changeAdminPassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Failed to change password');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/admin/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Failed to logout');
    }

    // Clear token from localStorage
    localStorage.removeItem('token');

    return data;
  } catch (error) {
    throw error;
  }
};
