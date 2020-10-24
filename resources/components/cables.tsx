import React, { lazy, Suspense } from 'react'
import { Button, Col, Row, Spin } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { addCable } from '../redux/cable/actions'
import { Dispatch } from '../redux'
import { CableState } from '../redux/cable/types'
import { PriceConfigState } from '../redux/price-config'
import { ModelState } from '../redux/model'

const Cable = lazy(
  () =>
    import(
      /* webpackChunkName: "form" */
      './cable'
    )
)

export interface CablesProps {
  dispatch: Dispatch
  cable: CableState
  priceConfig: PriceConfigState
  model: ModelState
}

export default class Cables extends React.Component<CablesProps> {
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
              <Suspense fallback={<Spin />}>
                <Cable
                  cable={c}
                  dispatch={dispatch}
                  priceConfig={priceConfig}
                  model={model}
                  index={i + 1}
                />
              </Suspense>
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
              style={{ margin: '16px 0' }}
            >
              <PlusCircleOutlined /> 增加一种线材
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}
