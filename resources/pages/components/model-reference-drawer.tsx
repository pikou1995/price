import * as React from 'react'
import { Drawer } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Model, { ModelProps } from '../model'
import rootStore from '@/store'
import { observer } from 'mobx-react-lite'

export default observer(function ModelReferenceDrawer(props: ModelProps) {
  const { modelStore } = rootStore
  return (
    <span>
      <QuestionCircleOutlined
        onClick={() => modelStore.setDrawerVisible(true)}
        style={{ color: '#1890ff' }}
      />
      <Drawer
        title="材料价格"
        onClose={() => modelStore.setDrawerVisible(false)}
        visible={modelStore.drawerVisible}
      >
        <Model {...props} style={{ margin: -24 }} />
      </Drawer>
    </span>
  )
})
