import { defaultState } from './config'

export function isDebuging() {
  return process.env.NODE_ENV === 'development'
}

export function randomIndex(length) {
  return Math.floor(Math.random() * length)
}

export function timeString() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

export function getInitialState() {
  const prevState = localStorage.getItem('app')
  if (prevState) {
    try {
      const state = JSON.parse(prevState)
      
      if (['id', 'cables'].every(key => key in state)) {
        return state
      }
    } catch (e) {
      localStorage.removeItem('app')
    }
  }
  return defaultState
}

export function getCableKey({ coreNum, coreArea, pair }) {
  return `${coreNum}*${pair ? '2*' : ''}${coreArea}`
}
