import { getToken } from '../../utils/token';

const API_URL = import.meta.env.VITE_API_URL;

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
      throw new Error(data.message || 'Failed to fetch equipments');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
