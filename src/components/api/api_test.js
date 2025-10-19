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
  console.log("[REQ] URL:", config.url);
  console.log("[REQ] Stored Token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response Interceptor (with detailed debug for refresh) ---
api.interceptors.response.use(
  (response) => {
    console.log("[RES] ✅", response.config.url, "->", response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    console.warn("[RES] ❌ Error on", originalRequest?.url, "Status:", status);

    // 401 Unauthorized → try refresh
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("[REFRESH] Triggered token refresh...");

      try {
        console.log("[REFRESH] Sending request to:", `${API_BASE_URL}/auth/refresh-token`);

        const res = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        console.log("[REFRESH] ✅ Response:", res.data);

        const newAccessToken = res.data.accessToken;
        if (!newAccessToken) {
          console.warn("[REFRESH] ⚠ No accessToken in response!");
          throw new Error("No accessToken returned from refresh");
        }

        // Store new token
        localStorage.setItem("authToken", newAccessToken);
        console.log("[REFRESH] 💾 New token saved to localStorage");

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("[REFRESH] 🔁 Retrying original request:", originalRequest.url);

        return api(originalRequest);
      } catch (refreshError) {
        console.error("[REFRESH] ❌ Refresh failed:", refreshError);
        localStorage.removeItem("authToken");
        return Promise.reject(refreshError);
      }
    }

    // Other errors
    console.log("[RES] ❌ Non-refresh error:", error);
    return Promise.reject(error);
  }
);

export default api;
