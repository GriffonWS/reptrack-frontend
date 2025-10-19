import axiosInstance, { getAccessToken } from "../auth/authServices";

export const registerUser = async (formData) => {
  try {
    const token = getAccessToken();
    if (!token)
      throw new Error("Authentication token not found. Please login.");

    const response = await axiosInstance.post("/users/register", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error registering user:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};
/**
 * Get all users with pagination and sorting
 */
export const getAllUsers = async (params = {}) => {
  try {
    const { limit, offset = 0, sortBy = "id", order = "DESC" } = params;
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sortBy,
      order,
    });

    if (limit) queryParams.append("limit", limit.toString());

    const token = getAccessToken();
    if (!token)
      throw new Error("Authentication token not found. Please login.");

    const response = await axiosInstance.get(
      `/users/get-all?${queryParams.toString()}`,
      { headers: { Authorization: `Bearer ${token}` } }
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
 */
export const getUserById = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");

    const token = getAccessToken();
    if (!token)
      throw new Error("Authentication token not found. Please login.");

    const response = await axiosInstance.get(`/users/get/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(
      `❌ Error fetching user ${userId}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Update user by ID
 */
export const updateUserById = async (userId, userData) => {
  try {
    if (!userId) throw new Error("User ID is required");

    const token = getAccessToken();
    if (!token)
      throw new Error("Authentication token not found. Please login.");

    const response = await axiosInstance.put(
      `/users/update/${userId}`,
      userData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error(
      `❌ Error updating user ${userId}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Update user with profile image (FormData)
 */
export const updateUserWithImage = async (userId, formData) => {
  try {
    if (!userId) throw new Error("User ID is required");

    const token = getAccessToken();
    if (!token)
      throw new Error("Authentication token not found. Please login.");

    const response = await axiosInstance.put(
      `/users/update/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `❌ Error updating user with image ${userId}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * 🗑️ Delete user by ID
 */
export const deleteUserById = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");

    const token = getAccessToken();
    if (!token)
      throw new Error("Authentication token not found. Please login.");

    const response = await axiosInstance.delete(`/users/delete/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(
      `❌ Error deleting user ${userId}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  updateUserWithImage,
  deleteUserById, // 👈 new service
};
