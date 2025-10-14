// services/authService.js
// Frontend Authentication Service for Admin Panel using Axios

import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/admin";

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
    const token = getAccessToken();
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
 * Add response interceptor to handle token refresh
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // Retry original request with new token
          const token = getAccessToken();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// TOKEN MANAGEMENT
// ============================================

/**
 * Save tokens to localStorage
 */
export const saveTokens = (token, refreshToken) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("refresh_token", refreshToken);
};

/**
 * Get access token from localStorage
 */
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

/**
 * Clear all tokens from localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("admin_user");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getAccessToken();
  return !!token;
};

/**
 * Save admin user data to localStorage
 */
export const saveAdminUser = (admin) => {
  localStorage.setItem("admin_user", JSON.stringify(admin));
};

/**
 * Get admin user data from localStorage
 */
export const getAdminUser = () => {
  const admin = localStorage.getItem("admin_user");
  return admin ? JSON.parse(admin) : null;
};

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

/**
 * Register a new admin
 */
export const registerAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post("/register", adminData);

    if (response.data) {
      saveTokens(response.data.token, response.data.refreshToken);
      saveAdminUser(response.data.admin);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Registration Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Login admin
 */
export const loginAdmin = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });

    if (response.data) {
      saveTokens(response.data.token, response.data.refreshToken);
      saveAdminUser(response.data.admin);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Get admin profile
 */
export const getAdminProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");

    if (response.data) {
      saveAdminUser(response.data.admin);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Get Profile Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Update admin profile
 */
export const updateAdminProfile = async (updateData) => {
  try {
    const response = await axiosInstance.put("/profile", updateData);

    if (response.data) {
      saveAdminUser(response.data.admin);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Update Profile Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      return false;
    }

    // Create instance without interceptors for refresh endpoint
    const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
      refreshToken,
    });

    if (response.data && response.data.token) {
      localStorage.setItem("access_token", response.data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.error("❌ Token Refresh Error:", error.response?.data || error.message);
    clearTokens();
    return false;
  }
};

/**
 * Logout admin
 */
export const logoutAdmin = async () => {
  try {
    await axiosInstance.post("/logout");
    clearTokens();
    return true;
  } catch (error) {
    // Clear tokens even if request fails
    clearTokens();
    console.error("❌ Logout Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if admin is superadmin
 */
export const isSuperAdmin = () => {
  const admin = getAdminUser();
  return admin?.role === "superadmin";
};

/**
 * Check if admin has specific role
 */
export const hasRole = (role) => {
  const admin = getAdminUser();
  return admin?.role === role;
};

/**
 * Decode JWT token and get expiration
 */
export const getTokenExpiration = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error("❌ Error decoding token:", error);
    return null;
  }
};

/**
 * Check if token is about to expire (within 1 minute)
 */
export const isTokenExpiringSoon = () => {
  const token = getAccessToken();
  if (!token) return false;

  const expiration = getTokenExpiration(token);
  if (!expiration) return false;

  const now = Date.now();
  const timeUntilExpiry = expiration - now;
  const oneMinute = 60 * 1000;

  return timeUntilExpiry < oneMinute;
};

/**
 * Auto-refresh token if expiring soon
 */
export const setupTokenRefreshTimer = () => {
  // Check token every 5 minutes
  const interval = setInterval(async () => {
    if (isAuthenticated() && isTokenExpiringSoon()) {
      console.log("🔄 Token expiring soon, refreshing...");
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        clearInterval(interval);
      }
    }
  }, 5 * 60 * 1000); // 5 minutes

  return interval;
};

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Get password strength feedback
 */
export const getPasswordStrengthFeedback = (password) => {
  const feedback = [];

  if (password.length < 8) {
    feedback.push("At least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push("At least 1 uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    feedback.push("At least 1 lowercase letter");
  }
  if (!/\d/.test(password)) {
    feedback.push("At least 1 number");
  }
  if (!/[@$!%*?&]/.test(password)) {
    feedback.push("At least 1 special character (@$!%*?&)");
  }

  return feedback;
};

// ============================================
// EXPORT AXIOS INSTANCE FOR CUSTOM REQUESTS
// ============================================

export default axiosInstance;