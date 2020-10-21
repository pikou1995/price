import * as React from 'react'
import { Button, Col, Row, Drawer } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import Cable from './cable'
import { addCable } from '../redux/cable/actions'
import { Dispatch } from '../redux'
import { CableState } from '../redux/cable/types'
import { PriceConfigState } from '../redux/price-config'
import MaterialSetting from './material-setting'
import { ModelState } from '../redux/model'

export interface CablesProps {
  dispatch: Dispatch
  cable: CableState
  priceConfig: PriceConfigState
  model: ModelState
}

export default class Cables extends React.Component<CablesProps> {
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
      cable: { cables = [] },
      dispatch,
      priceConfig,
      model,
    } = this.props
    return (
      <div>
        <Row gutter={16}>
          {cables.map((c, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={c.id}>
              <Cable
                cable={c}
                dispatch={dispatch}
                priceConfig={priceConfig}
                model={model}
                index={i + 1}
                showMaterialSettingDrawer={this.showDrawer}
              ></Cable>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xs={24} sm={12} md={6}>
            <Button
              block
              type="primary"
              ghost
              onClick={() => dispatch(addCable())}
              style={{ marginTop: '16px' }}
            >
              <PlusCircleOutlined /> 增加一种线材
            </Button>
          </Col>
          <Drawer
            title="材料价格"
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <MaterialSetting dispatch={dispatch} priceConfig={priceConfig} />
          </Drawer>
        </Row>
      </div>
    )
  }
}
