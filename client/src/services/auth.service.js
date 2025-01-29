const TOKEN_KEY = 'token';
const USER_KEY = 'user';

class AuthService {
  static getToken() {
    return localStorage.getItem(TOKEN_KEY);
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
}

export default AuthService; 