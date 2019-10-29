export function isDebuging() {
  return process.env.NODE_ENV === 'development'
}

export function randomIndex(length) {
  return Math.floor(Math.random() * length)
}
