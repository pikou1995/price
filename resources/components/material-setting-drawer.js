const { React, antd } = window
const { Drawer, Button } = antd
import MaterialSetting from './material-setting'

export default class MaterialSettingDrawer extends React.Component {
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
          icon="search"
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