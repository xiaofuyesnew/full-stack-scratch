import jsonwebtoken from 'jsonwebtoken'
import jwt from 'koa-jwt'

const { sign, verify } = jsonwebtoken

export function genJWT(path = []) {
  return jwt({
    secret: import.meta.env.VITE_SECRET || 'JWT_SECRET',
    cookie: 'Authorization',
    debug: import.meta.env.DEV,
  }).unless({ path })
}

export function signJWT(payload) {
  return sign(payload, import.meta.env.VITE_SECRET || 'JWT_SECRET', { expiresIn: '7d' })
}

export function verifyJWT(token) {
  return verify(token, import.meta?.env?.VITE_SECRET || 'JWT_SECRET')
}
