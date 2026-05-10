import api from './api';

export const login = async (payload: { email: string; password: string }) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const signup = async (payload: { name: string; email: string; password: string }) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};
