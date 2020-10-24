import React, { lazy, Suspense } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Cables from './cables'
import { Dispatch } from '../redux'
import { PriceConfigState, fetchPriceConfig } from '../redux/price-config'
import { fetchOrder } from '../redux/order/actions'
import { CableState } from '../redux/cable/types'
import { ModelState } from '../redux/model'
import { OrderState } from '../redux/order/types'
import { Spin } from 'antd'

const Report = lazy(
  () =>
    import(
      /* webpackChunkName: "table" */
      './report'
    )
)
const Price = lazy(
  () =>
    import(
      /* webpackChunkName: "form" */
      './price'
    )
)
const MaterialSettingDrawer = lazy(
  () =>
    import(
      /* webpackChunkName: "form" */
      './material-setting-drawer'
    )
)

export interface CalculatorProps {
  dispatch: Dispatch
  priceConfig: PriceConfigState
  cable: CableState
  model: ModelState
  order: OrderState
  materialDrawerVisible: boolean
}

export default function Calculator(props: CalculatorProps) {
  const {
    dispatch,
    priceConfig: { priceConfigLoaded },
    order: { orderLoaded },
    cable: { cables },
    materialDrawerVisible,
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
      <h2>配置规格</h2>
      <Cables {...props}></Cables>
      {cables.length > 0 && [
        <h2>配置价格</h2>,
        <Suspense fallback={<Spin />}>
          <Price {...props}></Price>
        </Suspense>,
        <h2>统计</h2>,
        <Suspense fallback={<Spin />}>
          <Report {...props}></Report>
        </Suspense>,
      ]}
      {materialDrawerVisible && (
        <Suspense fallback={<Spin />}>
          <MaterialSettingDrawer {...props} />
        </Suspense>
      )}
    </div>
  )
}
