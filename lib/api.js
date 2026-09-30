import axios from 'axios';
import { useAuthStore } from './store';

// Cliente Axios con interceptor: inyecta el JWT en CADA request.
// EVIDENCIA PARA EL VIDEO: console.log del header Authorization.
export const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(
      `[frontend] ${config.method?.toUpperCase()} ${config.url} -> Authorization: Bearer ${token.slice(0, 30)}... (largo ${token.length})`
    );
  } else {
    console.log(`[frontend] ${config.method?.toUpperCase()} ${config.url} -> sin token en memoria (usa cookie httpOnly via proxy)`);
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== 'undefined') {
      useAuthStore.getState().clear();
      if (!window.location.pathname.startsWith('/login')) window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
