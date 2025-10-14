// services/supportService.js
// Support Service for Communication Support Management using Axios

import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/support";

// ============================================
// AXIOS INSTANCE SETUP
// ============================================

/**
 * Create axios instance with default config
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Add request interceptor to attach token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Add response interceptor to handle errors
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// SUPPORT ENDPOINTS
// ============================================

/**
 * Get all support queries
 * @returns {Promise} Array of all support queries
 */
export const getAllSupports = async () => {
  try {
    const response = await axiosInstance.get("/get-all");
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching all supports:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Get support query by sender ID
 * @param {string} senderId - The sender ID to search for
 * @returns {Promise} Support query object
 */
export const getSupportBySenderId = async (senderId) => {
  try {
    const response = await axiosInstance.post("/get-by-sender_id", {
      sender_id: senderId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching support by sender ID:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Create a new support query
 * @param {Object} supportData - Support query data (sender_id, email, query)
 * @returns {Promise} Created support object
 */
export const createSupport = async (supportData) => {
  try {
    const response = await axiosInstance.post("/create", supportData);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error creating support query:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Get support query by ID
 * @param {number|string} id - The support query ID
 * @returns {Promise} Support query object
 */
export const getSupportById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching support by ID:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Delete a support query
 * @param {number|string} id - The support query ID to delete
 * @returns {Promise} Response object
 */
export const deleteSupport = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error deleting support query:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Update a support query
 * @param {number|string} id - The support query ID
 * @param {Object} updateData - Data to update
 * @returns {Promise} Updated support object
 */
export const updateSupport = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error updating support query:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};
