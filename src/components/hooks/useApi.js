import { useState, useCallback } from 'react';
import axios from 'axios';

// Create a reusable Axios instance
const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Custom hook
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic request handler
  const request = useCallback(async (method, endpoint, data = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        method,
        url: endpoint,
        data: (method === 'post' || method === 'put') && data === null ? {} : data,
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

  // Method wrappers
  const get = (endpoint, params = {}, token = null) =>
    request("get", endpoint, null, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

  const post = (endpoint, {data, token = null}) =>
    request("post", endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

  const put = (endpoint, {data, token = null}) =>
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


// Usage example:
// const { get, post, put, delete: remove, loading, error } = useApi();
