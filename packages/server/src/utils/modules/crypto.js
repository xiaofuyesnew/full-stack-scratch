import { randomBytes, scrypt } from 'node:crypto'

export function hashPassword(password, existSalt) {
  return new Promise((resolve, reject) => {
    const salt = existSalt || randomBytes(16).toString('hex')
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err)
        reject(err)
      resolve(`${salt}:${derivedKey.toString('hex')}`)
    })
  })
}
