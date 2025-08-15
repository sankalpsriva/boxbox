import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [verificationError, setVerificationError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }
      
      const userData = await response.json();
      setVerificationError(null);
      
      return {
        success: true,
        message: 'Registration successful! Please check your email to verify your account.',
        user: userData
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const requestVerification = async (email) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/request-verification?email=${email}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send verification email');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Verification request error:', error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle verification error specifically
        if (errorData.detail === "Please verify your email before logging in") {
          setVerificationError({
            username,
            message: "Please verify your email before logging in"
          });
          throw new Error(errorData.detail);
        }
        
        throw new Error(errorData.detail || 'Login failed');
      }
      
      const data = await response.json();
      
      // Save token
      const { access_token } = data;
      setToken(access_token);
      localStorage.setItem('token', access_token);
      
      // Get user data
      const userResponse = await fetch('http://localhost:8000/api/v1/me', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setVerificationError(null);
        return userData;
      }
      
      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    isLoggedIn,
    user,
    token,
    loading,
    verificationError,
    register,
    login,
    logout,
    requestVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
