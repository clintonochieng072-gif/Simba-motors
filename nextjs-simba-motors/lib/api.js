// API utility functions for making HTTP requests

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://simba-cars.onrender.com/api"
    : "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("adminToken");
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Settings API functions
export const getSettings = () => apiRequest("/settings");

export const updateFeeStructure = (data) =>
  apiRequest("/settings/fees", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateContentPages = (data) =>
  apiRequest("/settings/content", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateNotificationSettings = (data) =>
  apiRequest("/settings/notifications", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateAppearanceSettings = (data) =>
  apiRequest("/settings/appearance", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const changePassword = (data) =>
  apiRequest("/settings/password", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const generateApiKey = (data) =>
  apiRequest("/settings/api-keys", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getApiKeys = () => apiRequest("/settings/api-keys");

export const deleteApiKey = (id) =>
  apiRequest(`/settings/api-keys/${id}`, {
    method: "DELETE",
  });

export const getActiveSessions = () => apiRequest("/settings/sessions");

export const updateSession = (data) =>
  apiRequest("/settings/sessions", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Existing API functions (keeping for compatibility)
export const login = (credentials) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const getCars = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/cars?${queryString}`);
};

export const getCarById = (id) => apiRequest(`/cars/${id}`);

export const getCar = (id) => apiRequest(`/cars/${id}`); // Alias for backward compatibility

export const addCar = (formData, token) => {
  const url = `${API_BASE_URL}/admin/cars`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

export const updateCar = (id, data, token) => {
  const url = `${API_BASE_URL}/admin/cars/${id}`;

  // If data is FormData, use it directly
  if (data instanceof FormData) {
    return fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }

  // If data is a plain object, send as JSON
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

export const deleteCar = (id, token) =>
  apiRequest(`/admin/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDashboardStats = (token) =>
  apiRequest("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllCars = (token) =>
  apiRequest("/admin/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
