// bookit-frontend/src/services/api.ts

import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., logging, formatting)
    const errorResponse = {
      success: false,
      error: "An error occurred",
    };

    if (error.response) {
      // Server responded with an error
      return Promise.reject(error.response.data || errorResponse);
    } else if (error.request) {
      // Request made but no response received
      errorResponse.error = "No response from server";
      return Promise.reject(errorResponse);
    } else {
      // Error during request setup
      errorResponse.error = error.message;
      return Promise.reject(errorResponse);
    }
  }
);

export default api;