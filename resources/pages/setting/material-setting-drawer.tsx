import React from 'react'
import { Drawer } from 'antd'
import MaterialSetting from './material-setting'
import { observer } from 'mobx-react'
import rootStore from '../../store'

export default observer(function MaterialSettingDrawer() {
  return (
    <Drawer
      title="材料价格"
      onClose={() => rootStore.setMaterialDrawerVisible(false)}
      visible={rootStore.materialDrawerVisible}
    >
      <MaterialSetting />
    </Drawer>
  )
})
