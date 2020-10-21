import { RootState, RootActionTypes } from '.'
import { MiddlewareAPI } from 'redux'

const saveCablesStateLocal = ({ cable, model }: RootState) => {
  localStorage.setItem('app', JSON.stringify({ cable, model }))
}

const syncMiddleware = (api: MiddlewareAPI) => (next: Function) => (
  action: RootActionTypes
) => {
  next(action)

  const state = api.getState() as RootState

  saveCablesStateLocal(state)
}

export default syncMiddleware
