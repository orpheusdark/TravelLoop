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

export type PlannerDay = {
  day: number;
  title: string;
  weather: string;
  budget: string;
  highlights: string[];
};
