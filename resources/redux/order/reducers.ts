import {
  OrderState,
  OrderActionTypes,
  SET_ORDERS,
  SAVE_ORDER,
  DELETE_ORDER,
  SET_ORDER,
} from './types'

const initialState: OrderState = {
  orders: [],
  ordersLoaded: false,
  orderLoaded: false,
}

export function orderReducer(
  state = initialState,
  action: OrderActionTypes
): OrderState {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
        ordersLoaded: true,
      }
    case SAVE_ORDER:
      return {
        ...state,
        ordersLoaded: false,
      }
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(o => o.id !== action.id),
      }
    case SET_ORDER:
      return {
        ...state,
        orderLoaded: true,
      }
    default:
      return state
  }
}
