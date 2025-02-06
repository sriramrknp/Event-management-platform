import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api/events' });

// Add JWT to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEvents = async () => {
  const response = await API.get('/');
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await API.post('/', {
    ...eventData,
    date: new Date(eventData.date).toISOString()
  });
  return response.data;
};

export const getEventById = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

export const rsvpToEvent = async (id) => {
  const response = await API.post(`/${id}/rsvp`);
  return response.data;
};