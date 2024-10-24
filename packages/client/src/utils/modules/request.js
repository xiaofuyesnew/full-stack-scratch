import { router } from '@/router'
import { local } from './storage'

export const request = axios.create(
  {
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 5000,
  },
)

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${local.get('AccessToken')}`
  return config
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      local.remove('AccessToken')
      router.replace('/login')
    }
    return Promise.reject(err)
  },
)
