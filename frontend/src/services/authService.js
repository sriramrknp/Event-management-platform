import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api/auth' });

export const login = async (credentials) => {
  const response = await API.post('/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/register', userData);
  return response.data;
};

export const guestLogin = async () => {
  const response = await API.post('/guest-login');
  return response.data;
};