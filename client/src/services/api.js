import AuthService from './auth.service';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api`;

export const userService = {
  // Get all users
  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  // Create user
  registerUser: async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Sign in
  signIn: async (credentials) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      return response.json();
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async createUser(data) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  // Add this new method
  checkUsername: async (username) => {
    try {
      const response = await fetch(`${API_URL}/users/check-username/${username}`);
      return response.json();
    } catch (error) {
      throw new Error('Error checking username availability');
    }
  }
}; 