import * as React from 'react'
import { Popconfirm, Card, Icon, Menu, Dropdown } from 'antd'
import { copyCable, deleteCable } from '../redux/cable/actions'
import { Cable } from '../redux/cable/types'
import { Dispatch } from '../redux'
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
  showMaterialSettingDrawer: () => void
}

export default class CableComponent extends React.Component<CableProps> {
  state = { tab: 'cable' }

  render() {
    const { cable, dispatch, index, showMaterialSettingDrawer } = this.props
    const { tab } = this.state
    return (
      <Card
        title={`${index}. ${getCableKey(cable)}`}
        style={{ marginTop: 16 }}
        tabList={[
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
        ]}
        activeTabKey={tab}
        onTabChange={key => this.setState({ tab: key })}
        actions={[
          <Icon
            type="copy"
            key="copy"
            title="复制"
            onClick={() => dispatch(copyCable(cable.id))}
          />,
          <Popconfirm
            title="确认删除？"
            key="delete"
            onConfirm={() => dispatch(deleteCable(cable.id))}
          >
            <Icon type="delete" title="删除" />
          </Popconfirm>,
          <Icon
            type="search"
            key="search"
            title="显示材料价格"
            onClick={showMaterialSettingDrawer}
          />,
          <Icon
            type="account-book"
            key="account-book"
            title="价格"
            onClick={() => this.setState({ tab: 'price' })}
          />,
          <Icon
            type="calculator"
            key="calculator"
            title="计算过程"
            onClick={() => this.setState({ tab: 'calculation' })}
          />,
        ]}
      >
        {tab === 'cable' && <CableConfig {...this.props} />}
        {tab === 'price' && <PriceConfig {...this.props} />}
        {tab === 'calculation' && <Calculation {...this.props} />}
      </Card>
    )
  }
}
