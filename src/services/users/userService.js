// services/userService.js
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

    // Make API request
    const response = await axiosInstance.get(
      `/users/get-all?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching users:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Get a single user by ID
 * @param {number|string} userId - User ID
 * @returns {Promise<Object>} Response with user data
 */
export const getUserById = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Make API request
    const response = await axiosInstance.get(`/users/get/${userId}`);

    return response.data;
  } catch (error) {
    console.error(
      `❌ Error fetching user ${userId}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};
