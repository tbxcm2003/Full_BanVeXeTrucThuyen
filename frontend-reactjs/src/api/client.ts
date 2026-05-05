import axios from 'axios';
import { clearAuth, getToken } from '../auth/storage';

const rawApiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
const apiBaseURL = rawApiBase ? rawApiBase.replace(/\/+$/, '') : undefined;

export const api = axios.create({
  baseURL: apiBaseURL,
});

api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const st = err.response?.status;
    if (st === 401 || st === 403) {
      clearAuth();
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      const shouldStayOnLookupPage = currentPath === '/tra-cuu-ve';
      if (typeof window !== 'undefined' && currentPath !== '/' && !shouldStayOnLookupPage) {
        window.location.replace('/');
      }
    }
    return Promise.reject(err);
  }
);
