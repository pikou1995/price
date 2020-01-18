import axios from 'axios'
import * as _ from 'underscore'
import { timeString } from '../utils'
import { State } from '.'
import { Store, Action } from 'redux'
import { UPDATE_PRICE_CONFIG, PriceConfig } from './price-config'
import { SAVE_ORDER, OrderActionTypes } from './order/types'

const savePriceConfig = _.debounce((config: PriceConfig) => {
  axios.put('/api/config', config)
}, 500)

const saveOrder = _.throttle(
  (orderId: number, { cable, priceConfig }: State, cb: Function) => {
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

const saveCablesStateLocal = ({ cable, model }: State) => {
  localStorage.setItem('app', JSON.stringify({ cable, model }))
}

const syncMiddleware = (store: Store) => (next: Function) => (action: any) => {
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
