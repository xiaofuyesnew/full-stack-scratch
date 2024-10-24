export const local = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    }
    catch {
      return localStorage.getItem(key)
    }
  },
  set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key) {
    return localStorage.removeItem(key)
  },
  clear() {
    return localStorage.clear()
  },
}
