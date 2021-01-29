import React from 'react'
import { Popconfirm, Card, Col, Row } from 'antd'
import {
  AccountBookOutlined,
  CalculatorOutlined,
  CopyOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { copyCable, deleteCable } from '../redux/cable/actions'
import { Cable } from '../redux/cable/types'
import { Dispatch, setMaterialDrawerVisible } from '../redux'
import CableConfig from './cable-config'
import PriceConfig from './cable-price-config'
import Calculation from './cable-calculation'
import { getCableKey } from '../utils'
import { PriceConfigState } from '../redux/price-config'
import { ModelState } from '../redux/model'

export interface CableProps {
  dispatch: Dispatch
  cable: Cable
  index: number
  priceConfig: PriceConfigState
  model: ModelState
  mode?: 'default' | 'tab'
}

export default class CableComponent extends React.Component<CableProps> {
  state = { tab: 'cable' }

  render() {
    const { cable, dispatch, index, mode = 'default' } = this.props
    const { tab } = this.state
    return (
      <Card
        title={`${index}. ${getCableKey(cable)}`}
        style={{ marginTop: 16 }}
        tabList={
          mode === 'tab'
            ? [
                {
                  key: 'cable',
                  tab: '规格',
                },
                {
                  key: 'price',
                  tab: '价格',
                },
                {
                  key: 'calculation',
                  tab: '计算',
                },
              ]
            : undefined
        }
        activeTabKey={tab}
        onTabChange={(key) => this.setState({ tab: key })}
        actions={[
          <CopyOutlined
            key="copy"
            title="复制"
            onClick={() => dispatch(copyCable(cable.id))}
          />,
          <Popconfirm
            title="确认删除？"
            key="delete"
            onConfirm={() => dispatch(deleteCable(cable.id))}
          >
            <DeleteOutlined title="删除" />
          </Popconfirm>,
          <SearchOutlined
            key="search"
            title="显示材料价格"
            onClick={() => dispatch(setMaterialDrawerVisible(true))}
          />,
          <AccountBookOutlined
            key="account-book"
            title="价格"
            onClick={() => this.setState({ tab: 'price' })}
          />,
          <CalculatorOutlined
            key="calculator"
            title="计算过程"
            onClick={() => this.setState({ tab: 'calculation' })}
          />,
        ]}
      >
        {mode === 'tab' ? (
          tab === 'cable' ? (
            <CableConfig {...this.props} />
          ) : tab === 'price' ? (
            <PriceConfig {...this.props} />
          ) : tab === 'calculation' ? (
            <Calculation {...this.props} />
          ) : null
        ) : (
          <Row gutter={16}>
            <Col span={8}>
              <CableConfig {...this.props} />
            </Col>
            <Col span={8}>
              <PriceConfig {...this.props} />
            </Col>
            <Col span={8}>
              <Calculation {...this.props} />
            </Col>
          </Row>
        )}
      </Card>
    )
  }
}
