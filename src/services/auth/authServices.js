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
      console.log("🔑 Token attached to request");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Add response interceptor to handle authentication errors
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 - Token expired or invalid
    if (error.response?.status === 401) {
      console.error("❌ Authentication failed - clearing tokens");
      clearTokens();

      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// TOKEN MANAGEMENT
// ============================================

/**
 * Save token to localStorage
 */
export const saveTokens = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
    console.log("✅ Access token saved to localStorage");
  } else {
    console.error("❌ No token provided to save");
  }
};

/**
 * Get access token from localStorage
 */
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

/**
 * Clear all tokens from localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("admin_user");
  console.log("🗑️ Tokens cleared from localStorage");
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
  if (admin) {
    localStorage.setItem("admin_user", JSON.stringify(admin));
    console.log("✅ Admin user saved to localStorage");
  }
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
    const response = await axiosInstance.post("/register-admin", adminData);

    if (response.data && response.data.token) {
      saveTokens(response.data.token);
      if (response.data.admin) {
        saveAdminUser(response.data.admin);
      }
      console.log("✅ Registration successful");
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ Registration Error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Login admin
 */
export const loginAdmin = async (email, password) => {
  try {
    console.log("🔐 Attempting login for:", email);

    const response = await axiosInstance.post("/login-admin", {
      email,
      password,
    });

    console.log("📥 Login response received:", response.data);

    if (response.data && response.data.token) {
      // Save token to localStorage
      saveTokens(response.data.token);

      // Save admin user data
      if (response.data.admin) {
        saveAdminUser(response.data.admin);
      }

      console.log("✅ Login successful - Token and user data saved");

      // Verify storage
      console.log(
        "🔍 Verification - Token in storage:",
        getAccessToken() ? "YES" : "NO"
      );
      console.log(
        "🔍 Verification - User in storage:",
        getAdminUser() ? "YES" : "NO"
      );
    } else {
      console.error("❌ No token in response");
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

    if (response.data && response.data.admin) {
      saveAdminUser(response.data.admin);
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Profile Error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Update admin profile
 */
export const updateAdminProfile = async (updateData) => {
  try {
    const response = await axiosInstance.put("/profile", updateData);

    if (response.data && response.data.admin) {
      saveAdminUser(response.data.admin);
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Profile Error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

/**
 * Logout admin
 */
export const logoutAdmin = async () => {
  try {
    await axiosInstance.post("/logout");
    clearTokens();
    console.log("✅ Logout successful");
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
 * Check if token is expired
 */
export const isTokenExpired = () => {
  const token = getAccessToken();
  if (!token) return true;

  const expiration = getTokenExpiration(token);
  if (!expiration) return true;

  return Date.now() >= expiration;
};

/**
 * Check if token is about to expire (within 5 minutes)
 */
export const isTokenExpiringSoon = () => {
  const token = getAccessToken();
  if (!token) return false;

  const expiration = getTokenExpiration(token);
  if (!expiration) return false;

  const now = Date.now();
  const timeUntilExpiry = expiration - now;
  const fiveMinutes = 5 * 60 * 1000;

  return timeUntilExpiry < fiveMinutes && timeUntilExpiry > 0;
};

/**
 * Get time until token expires (in minutes)
 */
export const getTokenTimeRemaining = () => {
  const token = getAccessToken();
  if (!token) return 0;

  const expiration = getTokenExpiration(token);
  if (!expiration) return 0;

  const now = Date.now();
  const timeUntilExpiry = expiration - now;

  return Math.floor(timeUntilExpiry / (60 * 1000)); // Convert to minutes
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
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

/**
 * Get password strength level
 */
export const getPasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  if (strength <= 2) return { level: "weak", color: "red" };
  if (strength <= 4) return { level: "medium", color: "orange" };
  return { level: "strong", color: "green" };
};

// ============================================
// EXPORT AXIOS INSTANCE FOR CUSTOM REQUESTS
// ============================================

export default axiosInstance;
