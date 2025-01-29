import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  // Check token and user on mount
  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (storedUser && storedToken) {
        if (!AuthService.isTokenValid(storedToken)) {
          setAuthError('Your session has expired. Please login again.');
          logout();
          return;
        }
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
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

  const login = (userData, token, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem('user', JSON.stringify(userData));
    storage.setItem('token', token);
    
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
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