const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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
    apiRequest<{ token: string; user: { id: number; name: string; email: string } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  signup: (payload: { name: string; email: string; password: string }) =>
    apiRequest<{ token: string; user: { id: number; name: string; email: string } }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};

export const tripApi = {
  getTrips: (token?: string | null) => apiRequest<{ trips: unknown[] }>("/trips", { token }),
  getActivities: (params: string) => apiRequest<{ activities: unknown[] }>(`/activities/search?${params}`)
};
