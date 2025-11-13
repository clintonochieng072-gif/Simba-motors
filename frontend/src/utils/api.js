import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === "Invalid token"
    ) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  }
);

export const getCars = (params) => api.get("/cars", { params });
export const getCar = (id) => api.get(`/cars/${id}`);
export const addCar = (carData, token) =>
  api.post("/admin/cars", carData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateCar = (id, carData, token) =>
  api.put(`/admin/cars/${id}`, carData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteCar = (id, token) =>
  api.delete(`/admin/cars/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const login = (credentials) => api.post("/auth/login", credentials);

export default api;
