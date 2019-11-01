const { axios, _ } = window
import { UPDATE_PRICE_CONFIG } from '.'

const savePriceConfig = _.debounce(config => {
  axios.put('/api/config', config)
}, 500)

const saveCablesState = state => {
  const { id, cables } = state
  localStorage.setItem('app', JSON.stringify({ id, cables }))
}

const syncMiddleware = store => next => action => {
  next(action)
  switch (action.type) {
    case UPDATE_PRICE_CONFIG:
      savePriceConfig(store.getState().priceConfig)
      return
    default:
      saveCablesState(store.getState())
      break
  }
}

export default syncMiddleware
