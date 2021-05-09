import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import syncMiddleware from './sync-middleware'
import { getInitialState } from '../utils'
import { cableReducer } from './cable/reducers'
import {
  priceConfigReducer,
  PriceConfigState,
  PriceConfigActionTypes,
} from './price-config'
import { orderReducer } from './order/reducers'
import { modelReducer, ModelState, ModelActionTypes } from './model'
import { CableState, CableActionTypes } from './cable/types'
import { OrderState, OrderActionTypes } from './order/types'

export type RootState = {
  cable: CableState
  priceConfig: PriceConfigState
  model: ModelState
  order: OrderState
  materialDrawerVisible: boolean
}
export const SET_MATERIAL_DRAWER_VISIBLE = 'SET_MATERIAL_DRAWER_VISIBLE' as const
export interface SetMaterialDrawerVisibleAction {
  type: typeof SET_MATERIAL_DRAWER_VISIBLE
  visible: boolean
}
export function setMaterialDrawerVisible(visible: boolean) {
  return {
    type: SET_MATERIAL_DRAWER_VISIBLE,
    visible,
  }
}

export type RootActionTypes =
  | CableActionTypes
  | OrderActionTypes
  | ModelActionTypes
  | PriceConfigActionTypes
  | SetMaterialDrawerVisibleAction

export type Dispatch = ThunkDispatch<RootState, undefined, RootActionTypes>

export type ThunkResult<R> = ThunkAction<
  R,
  RootState,
  undefined,
  RootActionTypes
>

const initialState = getInitialState()

export const reducer = combineReducers({
  cable: cableReducer,
  priceConfig: priceConfigReducer,
  model: modelReducer,
  order: orderReducer,
  materialDrawerVisible(state = false, action: SetMaterialDrawerVisibleAction) {
    switch (action.type) {
      case SET_MATERIAL_DRAWER_VISIBLE:
        return action.visible
      default:
        return state
    }
  },
})

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware, syncMiddleware)
)

export default store
