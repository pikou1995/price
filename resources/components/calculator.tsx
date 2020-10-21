import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Cables from './cables'
import Price from './price'
import Report from './report'
import { Dispatch } from '../redux'
import { PriceConfigState, fetchPriceConfig } from '../redux/price-config'
import { fetchOrder } from '../redux/order/actions'
import { CableState } from '../redux/cable/types'
import { ModelState } from '../redux/model'
import { OrderState, Order } from '../redux/order/types'

export interface CalculatorProps {
  dispatch: Dispatch
  priceConfig: PriceConfigState
  cable: CableState
  model: ModelState
  order: OrderState
}

export default function Calculator(props: CalculatorProps) {
  const {
    dispatch,
    priceConfig: { priceConfigLoaded },
    order: { orderLoaded },
  } = props
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  if (id) {
    if (!orderLoaded) {
      dispatch(fetchOrder(+id)).catch(() => history.replace('/'))
      return null
    }
  } else {
    priceConfigLoaded || dispatch(fetchPriceConfig())
  }

  if (!priceConfigLoaded) return null

  return (
    <div style={{ padding: 15 }}>
      <h2>配置价格</h2>
      <Price {...props}></Price>
      <h2>配置规格</h2>
      <Cables {...props}></Cables>
      <h2>统计</h2>
      <Report {...props}></Report>
    </div>
  )
}
