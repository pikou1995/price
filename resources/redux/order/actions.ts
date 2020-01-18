import {
  OrderActionTypes,
  SAVE_ORDER,
  SET_ORDERS,
  DELETE_ORDER,
  Order,
  OrderState,
} from './types'
import axios from 'axios'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

/**
 * 保存清单
 * 只是触发事件, 真正保存操作是在 sync-middleware
 * @param {number} id 有 id 是更新, 无 id 是新增
 * @param {Function} callback 保存成功后在 sync-middleware.js 里面回调
 */
export function saveOrder({
  id,
  callback,
}: {
  id: Order['id']
  callback: Function
}): OrderActionTypes {
  return { type: SAVE_ORDER, id, callback }
}

export function setOrders(orders: Array<Order>): OrderActionTypes {
  return { type: SET_ORDERS, orders }
}

export function deleteOrder(id: Order['id']): OrderActionTypes {
  return { type: DELETE_ORDER, id }
}

type ThunkResult<R> = ThunkAction<R, OrderState, undefined, OrderActionTypes>

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
