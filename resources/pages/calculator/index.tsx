import React, { lazy, Suspense } from 'react'
import Cables from './cables'
import { Spin } from 'antd'
import rootStore from '@/store'
import { observer } from 'mobx-react'

const Report = lazy(
  () =>
    import(
      /* webpackChunkName: "table" */
      '../components/report'
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
      '../setting/material-setting-drawer'
    )
)

export default observer(function Calculator() {
  const { priceConfig, cableStore, materialDrawerVisible } = rootStore
  if (!priceConfig) {
    return null
  }

  const { cables } = cableStore

  return (
    <div style={{ padding: 15 }}>
      <h2>配置规格</h2>
      <Cables />
      {cables.length > 0 && [
        <h2>配置价格</h2>,
        <Suspense fallback={<Spin />}>
          <Price />
        </Suspense>,
        <h2>统计</h2>,
        <Suspense fallback={<Spin />}>
          <Report />
        </Suspense>,
      ]}
      {materialDrawerVisible && (
        <Suspense fallback={<Spin />}>
          <MaterialSettingDrawer />
        </Suspense>
      )}
    </div>
  )
})
