export function isDebuging() {
  return process.env.NODE_ENV === 'development'
}

export function randomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

export function getInitialState() {
  const prevState = localStorage.getItem('app')
  if (prevState) {
    try {
      const state = JSON.parse(prevState)

      if (['cable'].every((key) => key in state)) {
        return state
      }
    } catch (e) {
      localStorage.removeItem('app')
    }
  }
}
