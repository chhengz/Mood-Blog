// AppContext.jsx

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchUserByToken } from '../api/api'; 

// ... (defaultContext definition remains the same)

export const AppContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    theme: 'light',
    login: () => {},
    logout: () => {},
    setToken: () => {},
    toggleTheme: () => {},
    refreshUser: () => {},
});


export const AppProvider = ({ children }) => {
    // Initialize state from localStorage
    const initialToken = localStorage.getItem('authToken');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(initialToken);
    // Use initialToken presence for initial isAuthenticated state
    const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken); 
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [isCheckingAuth, setIsCheckingAuth] = useState(!!initialToken); // New: Loading state


    // 1. Core Authentication Check on Mount/Token Change
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                setIsCheckingAuth(true);
                const userData = await fetchUserByToken(token);
                
                if (userData) {
                    // Success: Token is valid, set user data
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    // Failure: Token invalid or expired, clear everything
                    console.log("Token validation failed. Logging out.");
                    logout(); // Use the existing logout function to clear storage/state
                }
                setIsCheckingAuth(false);
            } else {
                // No token, ensure user/auth state is clear
                setUser(null);
                setIsAuthenticated(false);
                setIsCheckingAuth(false);
            }
        };

        // Only run the check if a token exists and we haven't already checked it
        if (token && isCheckingAuth) {
            checkAuth();
        }

        // Cleanup function not strictly needed here, but good practice
    }, [token]); // Re-run only when the token state changes

    
    // 2. Login, Logout, and Token Management (Optimized from previous version)
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const login = useCallback((userData, newToken) => {
        if (newToken) {
            localStorage.setItem('authToken', newToken);
            setToken(newToken);
        }
        if (userData) {
            setUser(userData);
            setIsAuthenticated(true); // ✅ directly set authenticated
        }
    }, []);
    
    // ... (toggleTheme, updateToken, refreshUser functions remain similar)

    const updateToken = useCallback((newToken) => {
        if (newToken) {
            localStorage.setItem('authToken', newToken);
        } else {
            localStorage.removeItem('authToken');
        }
        setToken(newToken);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }, []);

    const refreshUser = useCallback(async () => {
        if (token) {
            // Re-use the main validation logic
            const userData = await fetchUserByToken(token);
            if (userData) {
                setUser(userData);
                return true;
            }
        }
        return false;
    }, [token]);

    // 3. The context value bundle
    const contextValue = {
        user,
        token,
        isAuthenticated,
        theme,
        isCheckingAuth, // <-- NEW: Useful for showing a loading spinner
        login,
        logout,
        setToken: updateToken,
        toggleTheme,
        refreshUser,
    };

    // Optional: Return a loading state while checking auth
    if (isCheckingAuth) {
        return <div>Loading authentication state...</div>;
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}