import { create } from 'zustand';

// Sesion en memoria (Zustand). El JWT crudo vive aqui + cookie httpOnly.
// Herramienta elegida: jose (middleware) + cookie httpOnly + Zustand/Context.
export const useAuthStore = create((set) => ({
  token: null,
  username: null,
  setSession: (token, username) => set({ token, username }),
  clear: () => set({ token: null, username: null }),
}));
