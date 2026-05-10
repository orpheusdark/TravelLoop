import api from './api';

export const searchCities = async (q: string, country?: string) => {
  const response = await api.get('/cities/search', { params: { q, country } });
  return response.data;
};

export const fetchCountries = async () => {
  const response = await api.get('/cities/countries');
  return response.data;
};
