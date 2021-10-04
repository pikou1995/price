import React from 'react'
import { Popconfirm, Card, Col, Row } from 'antd'
import {
  AccountBookOutlined,
  CalculatorOutlined,
  CopyOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import CableConfig from './cable-config'
import PriceConfig from './cable-price-config'
import Calculation from './cable-calculation'
import rootStore from '@/store'
import { Cable } from '@/store/cable'
import { observer } from 'mobx-react'

export interface CableProps {
  cable: Cable
  index: number
}

@observer
export default class CableComponent extends React.Component<CableProps> {
  state = { tab: 'cable' }

  render() {
    const { cable, index } = this.props
    const { tab } = this.state
    const { cableStore } = rootStore
    return (
      <Card
        title={`${index}. ${cable.key}`}
        style={{ marginTop: 16 }}
        activeTabKey={tab}
        onTabChange={(key) => this.setState({ tab: key })}
        actions={[
          <CopyOutlined
            key="copy"
            title="复制"
            onClick={() => cableStore.copy(cable.id)}
          />,
          <Popconfirm
            title="确认删除？"
            key="delete"
            onConfirm={() => cableStore.delete(cable.id)}
          >
            <DeleteOutlined title="删除" />
          </Popconfirm>,
          <SearchOutlined
            key="search"
            title="显示材料价格"
            onClick={() => rootStore.setMaterialDrawerVisible(true)}
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
      </Card>
    )
  }
}
