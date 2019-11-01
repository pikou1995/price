const { Redux, ReduxThunk, axios, _ } = window
const { createStore, applyMiddleware } = Redux
const thunkMiddleware = ReduxThunk.default
import syncMiddleware from './sync-middleware'
import { defaultState, defaultCable } from '../config'

/**
 * action types
 */
export const ADD_CABLE = 'ADD_CABLE'
export const UPDATE_CABLE = 'UPDATE_CABLE'
export const COPY_CABLE = 'COPY_CABLE'
export const DELETE_CABLE = 'DELETE_CABLE'

export const SET_PRICE_CONFIG = 'SET_PRICE_CONFIG'
export const UPDATE_PRICE_CONFIG = 'UPDATE_PRICE_CONFIG'

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

export function fetchPriceConfig() {
  return function(dispatch) {
    axios.get('/api/config').then(res => {
      dispatch(setPriceConfig(res.data))
    })
  }
}

function getInitialState() {
  const prevState = localStorage.getItem('app')
  if (prevState) {
    try {
      return JSON.parse(prevState)
    } catch (e) {
      localStorage.removeItem('app')
    }
  }
  return defaultState
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
    default:
      return state
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, syncMiddleware)
)

store.dispatch(fetchPriceConfig())

export default store
