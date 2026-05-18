"use client";

import { create } from "zustand";

type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type AppState = {
  token: string | null;
  user: AuthUser | null;
  recentSearches: string[];
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  addRecentSearch: (value: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  token: null,
  user: null,
  recentSearches: ["Kyoto", "Iceland", "Marrakech"],
  setAuth: (user, token) => set({ user, token }),
  logout: () => set({ token: null, user: null }),
  addRecentSearch: (value) =>
    set((state) => ({
      recentSearches: [value, ...state.recentSearches.filter((entry) => entry !== value)].slice(0, 6)
    }))
}));
