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
    const { models, spec } = this.props

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
            style={{}}
            models={models.filter(m => m.spec === spec)}
          />
        </Drawer>
      </span>
    )
  }
}