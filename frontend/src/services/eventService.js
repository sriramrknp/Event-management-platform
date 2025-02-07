import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: `${baseUrl}/api/events` });

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
  try {
    const response = await API.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const rsvpToEvent = async (id) => {
  const response = await API.post(`/${id}/rsvp`);
  return response.data;
};