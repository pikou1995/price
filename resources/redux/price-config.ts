import axios from 'axios'
import { ThunkResult } from '.'
import { Material, SWA } from './cable/types'

export type Price = {
  [index: string]: number
}

export type Weight = {
  [index: string]: number
}

type materialConfig = {
  [index in Material]: number
}

type exchangeRageConfig = {
  USD: number
}

type swaWeightConfig = {
    [index in SWA]: number
}

export type PriceConfig = {
  exchangeRage: exchangeRageConfig
  material: materialConfig
  iscrWeight: Weight
  insulationWeight: Weight
  oscrWeight: Weight
  sheathWeight: Weight
  innerSheathWeight: Weight
  swaWeight: swaWeightConfig
}

export type PriceConfigState = {
  priceConfig: PriceConfig
  priceConfigLoaded: boolean
}

export const SET_PRICE_CONFIG = 'SET_PRICE_CONFIG'
export const UPDATE_PRICE_CONFIG = 'UPDATE_PRICE_CONFIG'

interface SetPriceConfigAction {
  type: typeof SET_PRICE_CONFIG
  priceConfig: PriceConfig
}

interface UpdatePriceConfigAction {
  type: typeof UPDATE_PRICE_CONFIG
  c: keyof PriceConfig
  k: string
  v: string | number
}

export type PriceConfigActionTypes =
  | SetPriceConfigAction
  | UpdatePriceConfigAction

export function setPriceConfig(
  priceConfig: PriceConfig
): PriceConfigActionTypes {
  return { type: SET_PRICE_CONFIG, priceConfig }
}

export function updatePriceConfig<K extends keyof PriceConfig>(
  c: K,
  k: string,
  v: number
): PriceConfigActionTypes {
  return { type: UPDATE_PRICE_CONFIG, c, k, v }
}

/**
 * async action creators
 */
export function fetchPriceConfig(): ThunkResult<Promise<void>> {
  return async function(dispatch) {
    const res = await axios.get('/api/config')
    dispatch(setPriceConfig(res.data))
  }
}

const initialState: PriceConfigState = {
  priceConfig: {
    material: <materialConfig>{},
    insulationWeight: {},
    iscrWeight: {},
    oscrWeight: {},
    sheathWeight: {},
    innerSheathWeight: {},
    exchangeRage: <exchangeRageConfig>{},
    swaWeight: <swaWeightConfig>{},
  },
  priceConfigLoaded: false,
}

export function priceConfigReducer(
  state = initialState,
  action: PriceConfigActionTypes
) {
  const { priceConfig } = state
  switch (action.type) {
    case SET_PRICE_CONFIG:
      return {
        priceConfig: action.priceConfig,
        priceConfigLoaded: true,
      }
    case UPDATE_PRICE_CONFIG: {
      const { c, k, v } = action
      return {
        priceConfigLoaded: true,
        priceConfig: {
          ...priceConfig,
          [c]: {
            ...priceConfig[c],
            [k]: v,
          },
        },
      }
    }
    default:
      return state
  }
}
