import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setCurrentUser({ ...user, token });
    }
    setLoading(false);
  }, []);

 
  const register = async (name, email, password, phone) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      const data = await response.json();
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setCurrentUser({ ...data.user, token: data.access_token });
      
      return data.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      
      const data = await response.json();
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setCurrentUser({ ...data.user, token: data.access_token });
      
      return data.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return null;
      
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          return await refreshToken();
        }
        throw new Error('Failed to fetch user');
      }
      
      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser({ ...userData, token });
      return userData;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return null;
      
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      });
      
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      
      
      return await getCurrentUser();
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return null;
    }
  };


  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    window.location.href = '/login';
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    getCurrentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}