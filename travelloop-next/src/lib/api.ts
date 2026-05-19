const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
import { dedupeActivities } from "@/lib/activity-utils";

type RequestOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    apiRequest<{ token: string; user: { id: number; name: string; email: string; avatar?: string | null } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  register: (payload: { name: string; email: string; password: string }) =>
    apiRequest<{ token: string; user: { id: number; name: string; email: string; avatar?: string | null } }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  signup: (payload: { name: string; email: string; password: string }) => authApi.register(payload),
  profile: (token: string) =>
    apiRequest<{ user: { id: number; name: string; email: string; avatar?: string | null } }>("/auth/profile", {
      token
    })
};

export const tripApi = {
  getTrips: (token?: string | null) => apiRequest<{ trips: import("./types").TripSummary[] }>("/trips", { token }),
  getTrip: (id: number, token?: string | null) => apiRequest<{ trip: import("./types").TripSummary }>(`/trips/${id}`, { token }),
  createTrip: (
    payload: {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      travelerCount: number;
      budget: number;
      coverImage?: string;
      visibility?: "private" | "public";
    },
    token?: string | null
  ) =>
    apiRequest<{ trip: import("./types").TripSummary }>("/trips", {
      token,
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getActivities: async (params: string) => {
    const response = await apiRequest<{ activities: import("./types").ActivitySummary[] }>(`/activities/search?${params}`);
    return { activities: dedupeActivities(response.activities) };
  },
  getActivity: (id: string | number) => apiRequest<{ activity: import("./types").ActivitySummary }>(`/activities/${id}`),
  addActivityToTrip: (
    tripId: number,
    payload: { activity: import("./types").ActivitySummary; selectedDate?: string },
    token?: string | null
  ) =>
    apiRequest<{ tripActivity: unknown }>(`/trips/${tripId}/activities`, {
      token,
      method: "POST",
      body: JSON.stringify(payload)
    })
};
