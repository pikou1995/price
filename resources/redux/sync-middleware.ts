import { RootState, RootActionTypes } from '.'
import { MiddlewareAPI } from 'redux'

const saveCablesStateLocal = ({ cable, model, priceConfig }: RootState) => {
  localStorage.setItem('app', JSON.stringify({ cable, model, priceConfig }))
}

const syncMiddleware = (api: MiddlewareAPI) => (
  next: (...arg: any) => void
) => (action: RootActionTypes) => {
  next(action)

  const state = api.getState() as RootState

  saveCablesStateLocal(state)
}

export default syncMiddleware
