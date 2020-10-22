import * as React from 'react'
import { Drawer, Button } from 'antd'
import MaterialSetting, { MaterialSettingProps } from './material-setting'
import { SearchOutlined } from '@ant-design/icons'

export interface MaterialSettingDrawerProps extends MaterialSettingProps {
  style?: React.CSSProperties
}

export default class MaterialSettingDrawer extends React.Component<
  MaterialSettingDrawerProps
> {
  state = { visible: false }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { style, ...props } = this.props
    return (
      <div style={style}>
        <Button
          block
          type="primary"
          icon={<SearchOutlined />}
          ghost
          onClick={this.showDrawer}
        >
          材料价格
        </Button>
        <Drawer
          title="材料价格"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <MaterialSetting {...props} />
        </Drawer>
      </div>
    )
  }
}
