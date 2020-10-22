import React from 'react'
import { Drawer } from 'antd'
import MaterialSetting, { MaterialSettingProps } from './material-setting'
import { setMaterialDrawerVisible } from '../redux'

export interface MaterialSettingDrawerProps extends MaterialSettingProps {
  materialDrawerVisible: boolean
}

export default class MaterialSettingDrawer extends React.Component<
  MaterialSettingDrawerProps
> {
  render() {
    const { dispatch, materialDrawerVisible } = this.props
    return (
      <Drawer
        title="材料价格"
        onClose={() => dispatch(setMaterialDrawerVisible(false))}
        visible={materialDrawerVisible}
      >
        <MaterialSetting {...this.props} />
      </Drawer>
    )
  }
}
