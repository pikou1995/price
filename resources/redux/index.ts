import { createStore, applyMiddleware, Dispatch, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

import syncMiddleware from './sync-middleware'
import { getInitialState } from '../utils'
import { logReducer, LogState } from './log'
import { setCables } from './cable/actions'
import { cableReducer } from './cable/reducers'
import {
  setPriceConfig,
  priceConfigReducer,
  PriceConfigState,
} from './price-config'
import { orderReducer } from './order/reducers'
import { modelReducer, ModelState } from './model'
import { CableState } from './cable/types'
import { OrderState } from './order/types'

export function fetchOrder(id: number) {
  return function(dispatch: Dispatch) {
    return axios.get('/api/orders/' + id).then(res => {
      const { cables, priceConfig } = res.data
      dispatch(setCables(cables))
      dispatch(setPriceConfig(priceConfig))
    })
  }
}

export type State = {
  cable: CableState
  priceConfig: PriceConfigState
  model: ModelState
  order: OrderState
  log: LogState
}

const initialState = getInitialState()

export const reducer = combineReducers({
  cable: cableReducer,
  priceConfig: priceConfigReducer,
  model: modelReducer,
  order: orderReducer,
  log: logReducer,
})

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware, syncMiddleware)
)

export default store
