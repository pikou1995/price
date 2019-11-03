const { React, antd } = window
const { Drawer, Icon } = antd
import Model from './model'

export default class ModelReferenceDrawer extends React.Component {
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
    const { models = [], spec, showOscrWeight = true } = this.props
    return (
      <span>
        <Icon type="question-circle" onClick={this.showDrawer} />
        <Drawer
          title="材料价格"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Model
            {...this.props}
            style={{ margin: -24 }}
            models={models.filter(
              m => m.spec === spec && (!showOscrWeight || m.oscr)
            )}
          />
        </Drawer>
      </span>
    )
  }
}
