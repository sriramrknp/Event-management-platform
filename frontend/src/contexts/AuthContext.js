// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, guestLogin as apiGuestLogin } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const { token, user } = await apiLogin(credentials);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const register = async (userData) => {
    const { token, user } = await apiRegister(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  // In guestLogin function
const guestLogin = async () => {
  try {
    const { token, user } = await apiGuestLogin();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    return true; // Add return value
  } catch (error) {
    console.error('Guest login failed:', error);
    return false;
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, guestLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
