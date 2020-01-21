import * as moment from 'moment'
import { RootState } from './redux'
import { Cable } from './redux/cable/types'

export function isDebuging() {
  return process.env.NODE_ENV === 'development'
}

export function randomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

export function timeString(timestamp?: number) {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

export function getInitialState(): RootState {
  const prevState = localStorage.getItem('app')
  if (prevState) {
    try {
      const state = JSON.parse(prevState)

      if (['cable'].every(key => key in state)) {
        return state
      }
    } catch (e) {
      localStorage.removeItem('app')
    }
  }
}

export function getCableKey({ coreNum, coreArea, pair }: Cable) {
  return `${coreNum}*${pair ? '2*' : ''}${coreArea}`
}
