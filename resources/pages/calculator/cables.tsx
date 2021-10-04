import React, { lazy, Suspense } from 'react'
import { Button, Spin } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import rootStore from '@/store'

const Cable = lazy(
  () =>
    import(
      /* webpackChunkName: "form" */
      './cable'
    )
)

export default observer(function Cables() {
  const { cableStore } = rootStore
  const { cables } = cableStore
  return (
    <div>
      {cables.map((c, i) => (
        <Suspense fallback={<Spin />}>
          <Cable cable={c} index={i + 1} />
        </Suspense>
      ))}
      <Button
        block
        type="primary"
        ghost
        onClick={() => cableStore.create()}
        style={{ margin: '16px 0' }}
      >
        <PlusCircleOutlined /> 增加一种线材
      </Button>
    </div>
  )
})
