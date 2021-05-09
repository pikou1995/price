import * as React from 'react'
import { Drawer } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Model, { ModelProps } from './model'

export default class ModelReferenceDrawer extends React.Component<
  ModelProps & { spec: string }
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
    const {
      model: { models = [] },
      spec,
      showOscrWeight = true,
    } = this.props
    return (
      <span>
        <QuestionCircleOutlined
          onClick={this.showDrawer}
          style={{ color: '#1890ff' }}
        />
        <Drawer
          title="材料价格"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Model
            {...this.props}
            style={{ margin: -24 }}
            model={{
              modelsLoaded: true,
              models: models.filter(
                m => m.spec === spec && (!showOscrWeight || m.oscr)
              ),
            }}
          />
        </Drawer>
      </span>
    )
  }
}
