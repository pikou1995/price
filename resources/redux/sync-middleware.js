const { axios, _ } = window
import { UPDATE_PRICE_CONFIG, SAVE_ORDER } from '.'
import { timeString } from '../utils'

const savePriceConfig = _.debounce(config => {
  axios.put('/api/config', config)
}, 500)

const saveOrder = (orderId, state) => {
  const { id, cables, priceConfig, priceConfigLoaded } = state
  const order = {
    id,
    cables,
    priceConfig,
    priceConfigLoaded,
    time: timeString(),
  }
  orderId ? axios.put('/api/orders/' + orderId, order) : axios.post('/api/orders', order)
}

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
    case SAVE_ORDER:
      saveOrder(action.id, store.getState())
      return
    default:
      saveCablesState(store.getState())
      break
  }
}

export default syncMiddleware
