export type Order = {
  id: number
  time: string
}

export type OrderState = {
  orders: Array<Order>
  ordersLoaded: boolean
}

export const SAVE_ORDER = 'SAVE_ORDER'

export const SET_ORDERS = 'SET_ORDERS'
export const DELETE_ORDER = 'DELETE_ORDER'

interface SaveOrderAction {
  type: typeof SAVE_ORDER
  id: Order['id']
  callback: Function
}

interface SetOrdersAction {
  type: typeof SET_ORDERS
  orders: Array<Order>
}

interface DeleteOrderAction {
  type: typeof DELETE_ORDER
  id: Order['id']
}

export type OrderActionTypes =
  | SaveOrderAction
  | SetOrdersAction
  | DeleteOrderAction