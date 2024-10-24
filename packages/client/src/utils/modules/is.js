export function isMobilePhone(phone) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

export function isEmail(email) {
  const reg = /^[\w-]+@[\w-]+\.[\w-]+$/
  return reg.test(email)
}
