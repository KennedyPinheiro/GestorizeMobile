import axios, { AxiosInstance } from 'axios'
import auth from './auth'
import { secureStore } from '@utils/secureStore'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000/api'

export const authStorage = {
  async get(): Promise<string | null> {
    return secureStore.get(auth.storageTokenKeyName)
  },
  async set(token: string | null): Promise<void> {
    await secureStore.set(auth.storageTokenKeyName, token)
  }
}

type AxiosOpts = {
  contentType?: 'application/json' | 'multipart/form-data' | 'formData' | string
  timeoutMs?: number
}

export const getAxios = ({ contentType, timeoutMs }: AxiosOpts = {}): AxiosInstance => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (contentType) {
    headers['Content-Type'] = contentType === 'formData' ? 'multipart/form-data' : contentType
  }

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: typeof timeoutMs === 'number' ? timeoutMs : 10000,
    headers
  })

  instance.interceptors.request.use(async config => {
    const token = await authStorage.get()
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        await authStorage.set(null)
      }
      return Promise.reject(error)
    }
  )

  return instance
}

// Export default para compatibilidade anterior
const api = getAxios()
export default api
