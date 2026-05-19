export type Destination = {
  id: string;
  name: string;
  country: string;
  category: "Mountains" | "Beaches" | "Heritage" | "Adventure" | "Food" | "Hidden Gems";
  image: string;
  rating: number;
  weather: string;
  budget: number;
  duration: string;
};

export type TripInsight = {
  label: string;
  value: string;
  delta: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type TripSummary = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  travelerCount: number;
  budget: number;
  coverImage?: string | null;
  visibility: "private" | "public";
  tripStops?: Array<{ id: number; cityName?: string; city?: { name: string } | null }>;
};

export type ActivitySummary = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  estimatedCost: number;
  duration: number;
  rating: number;
  image?: string | null;
};

export type ActivitySearchParams = {
  category?: string;
  lat?: number;
  lon?: number;
  radius?: number;
};

export type PlannerDay = {
  day: number;
  title: string;
  weather: string;
  budget: string;
  highlights: string[];
};
