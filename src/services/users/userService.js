// services/userService.js
// Frontend User Service using Axios

import axiosInstance from "../auth/authServices";

/**
 * Get all users with pagination and sorting
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of users to fetch (optional)
 * @param {number} params.offset - Number of users to skip (default: 0)
 * @param {string} params.sortBy - Column to sort by (default: "id")
 * @param {string} params.order - Sort order "ASC" or "DESC" (default: "DESC")
 * @returns {Promise<Object>} Response with users data
 */
export const getAllUsers = async (params = {}) => {
  try {
    const { limit, offset = 0, sortBy = "id", order = "DESC" } = params;

    // Build query parameters
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sortBy,
      order,
    });

    // Add limit only if provided
    if (limit) {
      queryParams.append("limit", limit.toString());
    }

    // Make API request (no /admin prefix - that's only for auth routes)
    const response = await axiosInstance.get(
      `/users/get-all?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching users:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};