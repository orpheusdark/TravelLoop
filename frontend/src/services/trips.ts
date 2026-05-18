import api from './api';

export const getTrips = async () => {
  const response = await api.get('/trips');
  return response.data;
};

export const getTrip = async (id: number) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const createTrip = async (payload: any) => {
  const response = await api.post('/trips', payload);
  return response.data;
};

export const duplicateTrip = async (id: number) => {
  const response = await api.post(`/trips/${id}/duplicate`);
  return response.data;
};

export const addActivityToStop = async (payload: { stopId: number; activity: any; selectedDate?: string }) => {
  const response = await api.post('/trip-activities', payload);
  return response.data;
};

export const addActivityToTrip = async (tripId: number, payload: { activity: any; selectedDate?: string }) => {
  const response = await api.post(`/trips/${tripId}/activities`, payload);
  return response.data;
};
