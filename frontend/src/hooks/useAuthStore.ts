import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: number; name: string; email: string; avatar?: string | null } | null;
  setAuth: (user: AuthState['user'], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('traveloop_token'),
  user: JSON.parse(localStorage.getItem('traveloop_user') || 'null'),
  setAuth: (user, token) => {
    localStorage.setItem('traveloop_token', token);
    localStorage.setItem('traveloop_user', JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('traveloop_token');
    localStorage.removeItem('traveloop_user');
    set({ user: null, token: null });
  }
}));
