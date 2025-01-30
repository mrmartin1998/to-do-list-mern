const TOKEN_KEY = 'token';
const USER_KEY = 'user';

class AuthService {
  static setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  static getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static isTokenValid(token) {
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  static setupTokenRefresh(logout) {
    const token = this.getToken();
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresIn = payload.exp * 1000 - Date.now();
      
      if (expiresIn > 0) {
        setTimeout(() => {
          logout();
        }, expiresIn);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }

  static login(response) {
    if (response.status === 'success' && response.data) {
      this.setToken(response.data.token);
      this.setUser(response.data.user);
      return true;
    }
    return false;
  }

  static logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export default AuthService; 