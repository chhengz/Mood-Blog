// api.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_MODE === "production" ? import.meta.env.VITE_API_URL + "/api/v1" : "/api/v1";

/**
 * Simulates an API call to fetch user data using an authentication token.
 * In a real application, this would be an actual 'GET /user' or similar
 * API call using libraries like axios or the native fetch API.
 *
 * @param {string} token - The authentication token from localStorage.
 * @returns {Promise<object|null>} - A Promise that resolves to user data or null.
 */
export const fetchUserByToken = async (token) => {
    // 1. Basic Token Check
    if (!token) {
        console.warn("fetchUserByToken: No token provided.");
        return null;
    }

    // --- Start: Real API Call Simulation ---
    try {
        // Replace this with your actual API endpoint and method (e.g., Axios/Fetch)

        const response = await axios.get(`${API_BASE_URL}/users/me/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        
        if (response.status === 200) {
            const userData = response.data;
            return userData;
        } else {
            // If token is invalid/expired, the server usually returns a 401
            // console.log(response)
            throw new Error('Token validation failed or expired.');
        }


        // --- Simulated Success/Failure ---
        // if (token === 'VALID_MOCK_TOKEN') {
        //     // Simulate successful response with user data
        //     await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        //     return {
        //         id: 'user-123',
        //         username: 'mockUser',
        //         email: 'mock@example.com',
        //         roles: ['admin', 'user'],
        //     };
        // } else if (token === 'EXPIRED_MOCK_TOKEN') {
        //      // Simulate a server-side token expiry response
        //     await new Promise(resolve => setTimeout(resolve, 500));
        //     throw new Error('401 Unauthorized: Token Expired');
        // } else {
        //     // Assume any other token is invalid
        //     await new Promise(resolve => setTimeout(resolve, 500));
        //     throw new Error('403 Forbidden: Invalid Token');
        // }
        // --- End: Real API Call Simulation ---

    } catch (error) {
        console.error('API Error during token validation:', error.message);
        // Important: Return null on error so AppContext knows to clear the user/token
        return null;
    }
};