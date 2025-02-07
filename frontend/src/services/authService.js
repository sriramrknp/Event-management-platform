import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL; // Fallback for local development
const API = axios.create({ baseURL: `${baseUrl}/api/auth` });

export const login = async (credentials) => {
  console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
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