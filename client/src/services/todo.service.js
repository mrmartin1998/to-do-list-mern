import AuthService from './auth.service';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/todos`;

const getAuthHeader = () => ({
  'Authorization': `Bearer ${AuthService.getToken()}`,
  'Content-Type': 'application/json',
});

export const todoService = {
  async getTodos() {
    const response = await fetch(API_URL, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  async createTodo(data) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateTodo(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteTodo(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return response.json();
  },
}; 