import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  // Check token and user on mount
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        if (!AuthService.isTokenValid(token)) {
          setAuthError('Your session has expired. Please login again.');
          logout();
          return;
        }
        setUser(JSON.parse(userData));
        // Setup auto-logout on token expiry
        AuthService.setupTokenRefresh(() => {
          setAuthError('Your session has expired. Please login again.');
          logout();
        });
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setAuthError('');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    // Setup auto-logout for the new token
    AuthService.setupTokenRefresh(() => {
      setAuthError('Your session has expired. Please login again.');
      logout();
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      authError,
      setAuthError 
    }}>
      {!loading && children}
      {authError && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{authError}</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 