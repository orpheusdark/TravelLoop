import api from './api';

export const searchActivities = async (params: { lat: number; lon: number; category?: string }) => {
  const response = await api.get('/activities/search', { params });
  return response.data;
};
