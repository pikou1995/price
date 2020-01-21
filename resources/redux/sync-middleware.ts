import axios from 'axios'
import { throttle, debounce } from 'underscore'
import { timeString } from '../utils'
import { RootState, RootActionTypes } from '.'
import { Store } from 'redux'
import { UPDATE_PRICE_CONFIG, PriceConfig } from './price-config'
import { SAVE_ORDER, SaveOrderCallback } from './order/types'

const savePriceConfig = debounce((config: PriceConfig) => {
  axios.put('/api/config', config)
}, 500)

const saveOrder = throttle(
  (
    orderId: number,
    { cable, priceConfig }: RootState,
    cb?: SaveOrderCallback
  ) => {
    const order = {
      cable,
      priceConfig,
      time: timeString(),
    }

    const promise = orderId
      ? axios.put('/api/orders/' + orderId, order)
      : axios.post('/api/orders', order)

    promise.then(res => cb && cb(res.data || {}))
  },
  1000
)

const saveCablesStateLocal = ({ cable, model }: RootState) => {
  localStorage.setItem('app', JSON.stringify({ cable, model }))
}

const syncMiddleware = (store: Store) => (next: Function) => (
  action: RootActionTypes
) => {
  next(action)

  const state = store.getState() as RootState

  switch (action.type) {
    case UPDATE_PRICE_CONFIG:
      savePriceConfig(state.priceConfig.priceConfig)
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
