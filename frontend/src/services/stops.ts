import api from './api';

export const addStop = async (payload: {
  tripId: number;
  cityId?: number;
  cityName?: string;
  arrivalDate: string;
  departureDate: string;
  orderIndex: number;
  notes?: string;
}) => {
  const response = await api.post('/trip-stops', payload);
  return response.data;
};

export const reorderStops = async (orders: Array<{ id: number; orderIndex: number }>) => {
  const response = await api.patch('/trip-stops/reorder', { orders });
  return response.data;
};

export const deleteStop = async (id: number) => {
  const response = await api.delete(`/trip-stops/${id}`);
  return response.data;
};