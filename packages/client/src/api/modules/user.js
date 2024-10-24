import { request } from '@/utils'

export function getUserInfo() {
  return request.get('/user/info')
}
