const { Redux, ReduxThunk, axios, _ } = window
const { createStore, applyMiddleware } = Redux
const thunkMiddleware = ReduxThunk.default
import syncMiddleware from './sync-middleware'
import { defaultCable } from '../config'
import { getInitialState } from '../utils'
import { logsReducer } from './logs'

/**
 * action types
 */
export const ADD_CABLE = 'ADD_CABLE'
export const UPDATE_CABLE = 'UPDATE_CABLE'
export const COPY_CABLE = 'COPY_CABLE'
export const DELETE_CABLE = 'DELETE_CABLE'

export const SET_PRICE_CONFIG = 'SET_PRICE_CONFIG'
export const UPDATE_PRICE_CONFIG = 'UPDATE_PRICE_CONFIG'
export const SAVE_ORDER = 'SAVE_ORDER'

export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const CLEAR_ORDER = 'CLEAR_ORDER'
export const DELETE_ORDER = 'DELETE_ORDER'

export const SET_MODELS = 'SET_MODELS'

/**
 * action creators
 */
export function addCable() {
  return { type: ADD_CABLE }
}

export function updateCable(cable) {
  return { type: UPDATE_CABLE, cable }
}

export function copyCable(id) {
  return { type: COPY_CABLE, id }
}

export function deleteCable(id) {
  return { type: DELETE_CABLE, id }
}

export function setPriceConfig(priceConfig) {
  return { type: SET_PRICE_CONFIG, priceConfig }
}

export function updatePriceConfig(c, k, v) {
  return { type: UPDATE_PRICE_CONFIG, c, k, v }
}

export function saveOrder(id, callback) {
  return { type: SAVE_ORDER, id, callback }
}

export function setOrders(orders) {
  return { type: SET_ORDERS, orders }
}

export function clearOrder() {
  return { type: CLEAR_ORDER }
}

export function setOrder(order) {
  return { type: SET_ORDER, order }
}

export function deleteOrder(id) {
  return { type: DELETE_ORDER, id }
}

export function setModels(models) {
  return { type: SET_MODELS, models }
}

/**
 * async action creators
 */
export function fetchPriceConfig() {
  return function(dispatch) {
    axios.get('/api/config').then(res => {
      dispatch(setPriceConfig(res.data))
    })
  }
}

export function fetchOrders() {
  return function(dispatch) {
    axios.get('/api/orders').then(res => {
      dispatch(setOrders(res.data))
    })
  }
}

export function fetchOrder(id, errCb) {
  return function(dispatch) {
    axios
      .get('/api/orders/' + id)
      .then(res => {
        dispatch(setOrder(res.data))
      })
      .catch(e => {
        if (errCb) {
          return errCb(e)
        }
        throw e
      })
  }
}

export function requestDeleleOrder(id) {
  return function(dispatch) {
    axios.delete('/api/orders/' + id)
    dispatch(deleteOrder(id))
  }
}

export function fetchModels() {
  return function(dispatch) {
    axios.get('/api/models').then(res => {
      dispatch(setModels(res.data))
    })
  }
}

const initialState = getInitialState()

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CABLE:
      return {
        ...state,
        id: state.id + 1,
        cables: [...state.cables, { id: state.id + 1, ...defaultCable }],
      }
    case UPDATE_CABLE:
      const { cable } = action
      return {
        ...state,
        cables: state.cables.map(c => {
          if (c.id === cable.id) {
            return { ...c, ...cable }
          }
          return c
        }),
      }
    case COPY_CABLE:
      return {
        ...state,
        id: state.id + 1,
        cables: [
          ...state.cables,
          {
            ...state.cables.find(c => c.id === action.id),
            id: state.id + 1,
          },
        ],
      }
    case DELETE_CABLE:
      return {
        ...state,
        cables: state.cables.filter(c => c.id !== action.id),
      }
    case SET_PRICE_CONFIG:
      return {
        ...state,
        priceConfig: action.priceConfig,
        priceConfigLoaded: true,
      }
    case UPDATE_PRICE_CONFIG:
      return {
        ...state,
        priceConfig: {
          ...state.priceConfig,
          [action.c]: {
            ...state.priceConfig[action.c],
            [action.k]: action.v,
          },
        },
      }
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
    case SET_ORDER:
      return {
        ...action.order,
        orderLoaded: true,
        priceConfigLoaded: true,
        orders: state.orders,
      }
    case CLEAR_ORDER:
      return {
        orders: state.orders,
      }
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(o => o.id !== action.id),
      }
    case SET_MODELS:
      return {
        ...state,
        models: action.models,
        modelsLoaded: true,
      }
    default:
      return {
        ...state,
        logs: logsReducer(state.logs, action),
      }
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, syncMiddleware)
)

export default store
