import * as React from 'react'
import { Drawer, Icon } from 'antd'
import Model, { ModelProps } from './model'

export interface ModelReferenceDrawerProps extends ModelProps {
  spec: string
}

export default class ModelReferenceDrawer extends React.Component<
  ModelReferenceDrawerProps
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
        <Icon
          type="question-circle"
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
