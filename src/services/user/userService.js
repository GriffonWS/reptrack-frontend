import { getToken, removeToken } from '../../utils/token';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async (page = 0, size = 10) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/all-users?page=${page}&size=${size}`, {
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
      throw new Error(data.message || 'Failed to fetch users');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/get-user-details/${userId}`, {
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
      throw new Error(data.message || 'Failed to fetch user details');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/remove/${userId}`, {
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
      }
      throw new Error(data.message || 'Failed to delete user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Failed to register user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(data.message || 'Failed to update user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
