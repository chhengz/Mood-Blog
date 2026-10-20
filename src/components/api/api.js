// api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_MODE === "production"
    ? import.meta.env.VITE_API_URL + "/api/v1"
    : "/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

// --- Request Interceptor ---
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response Interceptor for Auto Refresh ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh endpoint
        const res = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // console.log(res);

        const newAccessToken = res.data.accessToken;

        // store new token
        localStorage.setItem("authToken", newAccessToken);

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.warn("Refresh failed, user must log in again.");
        localStorage.removeItem("authToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Example usage
export const fetchUserByToken = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("API Error:", error.message);
    return null;
  }
};
