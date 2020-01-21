import {
  OrderActionTypes,
  SAVE_ORDER,
  SET_ORDERS,
  DELETE_ORDER,
  SET_ORDER,
  Order,
  SaveOrderCallback,
} from './types'
import axios from 'axios'
import { ThunkResult } from '..'
import { setCables } from '../cable/actions'
import { setPriceConfig } from '../price-config'

/**
 * 保存清单
 * 只是触发事件, 真正保存操作是在 sync-middleware
 * @param {number} id 有 id 是更新, 无 id 是新增
 * @param {Function} callback 保存成功后在 sync-middleware.js 里面回调
 */
export function saveOrder(
  id: Order['id'],
  callback: SaveOrderCallback
): OrderActionTypes {
  return { type: SAVE_ORDER, id, callback }
}

export function setOrders(orders: Array<Order>): OrderActionTypes {
  return { type: SET_ORDERS, orders }
}

export function deleteOrder(id: Order['id']): OrderActionTypes {
  return { type: DELETE_ORDER, id }
}

export function setOrder(): OrderActionTypes {
  return { type: SET_ORDER }
}

export function fetchOrders(): ThunkResult<Promise<void>> {
  return async function(dispatch) {
    const res = await axios.get('/api/orders')
    dispatch(setOrders(res.data))
  }
}

export function requestDeleleOrder(id: number): ThunkResult<void> {
  return function(dispatch) {
    axios.delete('/api/orders/' + id)
    dispatch(deleteOrder(id))
  }
}

export function fetchOrder(id: number): ThunkResult<Promise<void>> {
  return async function(dispatch) {
    const res = await axios.get('/api/orders/' + id)
    const { cables, priceConfig } = res.data
    dispatch(setCables(cables))
    dispatch(setPriceConfig(priceConfig))
    dispatch(setOrder())
  }
}
