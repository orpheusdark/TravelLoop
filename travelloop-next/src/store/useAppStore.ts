"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
};

type AppState = {
  token: string | null;
  user: AuthUser | null;
  activeTripId: number | null;
  pendingDestination: string | null;
  savedDestinations: string[];
  recentSearches: string[];
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  setActiveTripId: (tripId: number | null) => void;
  setPendingDestination: (destination: string | null) => void;
  saveDestination: (destination: string) => void;
  addRecentSearch: (value: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      activeTripId: null,
      pendingDestination: null,
      savedDestinations: [],
      recentSearches: ["Kyoto", "Iceland", "Marrakech"],
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ token: null, user: null, activeTripId: null }),
      setActiveTripId: (tripId) => set({ activeTripId: tripId }),
      setPendingDestination: (destination) => set({ pendingDestination: destination }),
      saveDestination: (destination) =>
        set((state) => ({
          savedDestinations: [destination, ...state.savedDestinations.filter((entry) => entry !== destination)].slice(0, 8)
        })),
      addRecentSearch: (value) =>
        set((state) => ({
          recentSearches: [value, ...state.recentSearches.filter((entry) => entry !== value)].slice(0, 6)
        }))
    }),
    {
      name: "travelloop-app-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        activeTripId: state.activeTripId,
        pendingDestination: state.pendingDestination,
        savedDestinations: state.savedDestinations,
        recentSearches: state.recentSearches
      })
    }
  )
);
