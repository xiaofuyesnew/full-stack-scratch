import { request } from '@/utils'

export function login(params) {
  return request.post('/auth/login', params)
}
