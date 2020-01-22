import * as React from 'react'
import { Button, message } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import Cables from './cables'
import Price from './price'
import Report from './report'
import { Dispatch } from '../redux'
import { PriceConfigState, fetchPriceConfig } from '../redux/price-config'
import { saveOrder, fetchOrder } from '../redux/order/actions'
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
  const { id } = useParams()
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
      <h2>第一步: 配置规格</h2>
      <Cables {...props}></Cables>
      <h2>第二步: 配置价格</h2>
      <Price {...props}></Price>
      <h2>第三步: 计算结果</h2>
      <Report {...props}></Report>
      <Button
        type="primary"
        block
        icon="cloud-upload"
        onClick={() =>
          dispatch(
            saveOrder(id ? +id : undefined, ({ id }: Order) => {
              message.success('保存成功')
              id && history.replace('/' + id)
            })
          )
        }
        style={{ marginTop: 24 }}
      >
        保存
      </Button>
    </div>
  )
}
