// AppContext.jsx

import React, { createContext, useState, useEffect, useCallback } from "react";
import { fetchUserByToken } from "../api/api";
import Loading from "../ui/loading/Loading";

export const AppContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  theme: "light",
  login: () => {},
  logout: () => {},
  setToken: () => {},
  toggleTheme: () => {},
  refreshUser: () => {},
});

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage
  const initialToken = localStorage.getItem("authToken");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(initialToken);
  // Use initialToken presence for initial isAuthenticated state
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(!!initialToken); // New: Loading state

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        setIsCheckingAuth(true);
        const userData = await fetchUserByToken(token);

        // console.log("userData from token:", userData);

        if (userData) {
          setUser(userData.data);
          setIsAuthenticated(true);
        } else {
          console.log("Token validation failed. Logging out.");
          logout();
        }
        setIsCheckingAuth(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
      }
    };

    if (token && isCheckingAuth) {
      checkAuth();
    }
  }, [token]);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const login = useCallback((userData, newToken) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
      setToken(newToken);
    }
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const updateToken = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
    setToken(newToken);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const refreshUser = useCallback(async () => {
    if (token) {
      const userData = await fetchUserByToken(token);
      if (userData) {
        setUser(userData);
        return true;
      }
    }
    return false;
  }, [token]);

  const contextValue = {
    user,
    token,
    isAuthenticated,
    theme,
    isCheckingAuth,
    login,
    logout,
    setToken: updateToken,
    toggleTheme,
    refreshUser,
  };

  // if (isCheckingAuth) {
  //   return <Loading fullScreen spinner />;
  // }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
