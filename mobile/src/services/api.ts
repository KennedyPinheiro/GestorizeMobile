import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.15.4:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getAxios = () => api;

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
