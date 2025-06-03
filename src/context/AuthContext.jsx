// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.get(`${API_URL}/users/profile`, config);
//         setCurrentUser(response.data);
//         setIsAuthenticated(true);
//       } catch (err) {
//         console.error("Authentication error:", err);
//         localStorage.removeItem("token");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     setError(null);
//     try {
//       const response = await axios.post(`${API_URL}/auth/login`, {
//         email,
//         password,
//       });
//       const { token, user } = response.data;

//       localStorage.setItem("token", token);
//       setCurrentUser(user);
//       setIsAuthenticated(true);
//       return true;
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Login failed. Please check your credentials."
//       );
//       return false;
//     }
//   };

//   // Signup function
//   const signup = async (name, email, password) => {
//     setError(null);
//     try {
//       const response = await axios.post(`${API_URL}/users/register`, {
//         name,
//         email,
//         password,
//       });

//       return true;
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Registration failed. Please try again."
//       );
//       return false;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     setCurrentUser(null);
//     setIsAuthenticated(false);
//   };

//   // Clear error messages
//   const clearError = () => {
//     setError(null);
//   };

//   const value = {
//     currentUser,
//     isAuthenticated,
//     isLoading,
//     error,
//     login,
//     signup,
//     logout,
//     clearError,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication by verifying token and fetching profile
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_URL}/users/profile`, config);
      setCurrentUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Authentication error:", err);
      localStorage.removeItem("token");
      setCurrentUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      return false;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    setError(null);
    try {
      await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
      });

      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Clear error messages
  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
    checkAuth, // expose this to use after login/signup if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
