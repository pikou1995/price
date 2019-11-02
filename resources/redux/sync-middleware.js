const { axios, _ } = window
import { UPDATE_PRICE_CONFIG, SAVE_ORDER, SET_MODELS } from '.'
import { timeString } from '../utils'

const savePriceConfig = _.debounce(config => {
  axios.put('/api/config', config)
}, 500)

const saveOrder = _.throttle((orderId, state, cb) => {
  const { id, cables, priceConfig, priceConfigLoaded } = state
  const order = {
    id,
    cables,
    priceConfig,
    priceConfigLoaded,
    time: timeString(),
  }

  const promise = orderId
    ? axios.put('/api/orders/' + orderId, order)
    : axios.post('/api/orders', order)

  promise.then(res => cb && cb(res.data || {}))
}, 1000)

const saveCablesStateLocal = state => {
  const { id, cables, models, modelsLoaded } = state
  localStorage.setItem(
    'app',
    JSON.stringify({ id, cables, models, modelsLoaded })
  )
}

const syncMiddleware = store => next => action => {
  next(action)

  const state = store.getState()

  switch (action.type) {
    case UPDATE_PRICE_CONFIG:
      savePriceConfig(state.priceConfig)
      return
    case SAVE_ORDER:
      saveOrder(action.id, state, action.callback)
      return
    default:
      saveCablesStateLocal(state)
      break
  }
}

export default syncMiddleware
