// API utility functions for making HTTP requests

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://simba-cars.onrender.com/api";

console.log("API_BASE_URL at runtime:", API_BASE_URL);

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem("adminToken");
};

// Generic API request function
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const defaultOptions: RequestInit = {
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
export const getSettings = (): Promise<any> => apiRequest("/settings");

export const updateFeeStructure = (data: any): Promise<any> =>
  apiRequest("/settings/fees", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateContentPages = (data: any): Promise<any> =>
  apiRequest("/settings/content", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateNotificationSettings = (data: any): Promise<any> =>
  apiRequest("/settings/notifications", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const updateAppearanceSettings = (data: any): Promise<any> =>
  apiRequest("/settings/appearance", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const changePassword = (data: any): Promise<any> =>
  apiRequest("/settings/password", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const generateApiKey = (data: any): Promise<any> =>
  apiRequest("/settings/api-keys", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getApiKeys = (): Promise<any> => apiRequest("/settings/api-keys");

export const deleteApiKey = (id: string): Promise<any> =>
  apiRequest(`/settings/api-keys/${id}`, {
    method: "DELETE",
  });

export const getActiveSessions = (): Promise<any> =>
  apiRequest("/settings/sessions");

export const updateSession = (data: any): Promise<any> =>
  apiRequest("/settings/sessions", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Existing API functions (keeping for compatibility)
export const login = async (credentials: any): Promise<any> => {
  const url = `${API_BASE_URL}/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getCars = (params: Record<string, string> = {}): Promise<any> => {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/cars?${queryString}`);
};

export const getCarById = (id: string): Promise<any> =>
  apiRequest(`/cars/${id}`);

export const getCar = (id: string): Promise<any> => apiRequest(`/cars/${id}`); // Alias for backward compatibility

export const addCar = (formData: FormData, token: string): Promise<any> => {
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

export const updateCar = (
  id: string,
  data: FormData | Record<string, any>,
  token: string
): Promise<any> => {
  const url = `${API_BASE_URL}/admin/cars/${id}`;

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
  } else {
    // For JSON data
    return apiRequest(`/admin/cars/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
};

export const deleteCar = (id: string, token: string): Promise<any> =>
  apiRequest(`/admin/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDashboardStats = (token: string): Promise<any> =>
  apiRequest("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllCars = (token: string): Promise<any> =>
  apiRequest("/admin/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
