import axios from 'axios';
import auth from './auth';
import { secureStore } from '@utils/secureStore';

let unauthorizedHandler: (() => void | Promise<void>) | null = null;

export const setUnauthorizedHandler = (
  handler: (() => void | Promise<void>) | null,
) => {
  unauthorizedHandler = handler;
};

export const authStorage = {
  async get(): Promise<string | null> {
    return secureStore.get(auth.storageTokenKeyName);
  },
  async set(token: string | null): Promise<void> {
    await secureStore.set(auth.storageTokenKeyName, token);
  },
};

export const api = axios.create({
  baseURL: 'http://192.168.21.81:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await authStorage.get();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await authStorage.set(null);
      await unauthorizedHandler?.();
    }
    return Promise.reject(error);
  },
);

export default api;
