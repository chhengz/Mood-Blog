// useApi.js


import { useState, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, endpoint, data = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        method,
        url: endpoint,
        data,
        ...config,
      });
      return response.data;
    } catch (err) {
      if (err.response) {
        console.error("API Error:", {
          status: err.response.status,
          data: err.response.data,
        });
        setError(err.response.data?.message || err.message);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response from server");
      } else {
        console.error("Request error:", err.message);
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Wrappers
  const get = (endpoint, params = {}, token = null) =>
    request("get", endpoint, null, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

  const post = (endpoint, data = {}, token = null) =>
    request("post", endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

  const put = (endpoint, data = {}, token = null) =>
    request("put", endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

  const remove = (endpoint, token = null) =>
    request("delete", endpoint, null, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

  return { get, post, put, delete: remove, loading, error };
};

export default useApi;
