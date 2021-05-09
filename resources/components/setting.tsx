import React from 'react'
import { Button, Modal, Row, Col } from 'antd'
import MaterialSetting from './material-setting'
import { PriceConfigState } from '../redux/price-config'
import { Dispatch } from '../redux'

function clearLocalStorage() {
  Modal.confirm({
    title: '确认清空缓存?',
    content: '此操作会丢弃所有计算进度！',
    onOk() {
      localStorage.clear()
      location.reload()
    },
  })
}

export interface SettingProps {
  dispatch: Dispatch
  priceConfig: PriceConfigState
}

export default function Setting(props: SettingProps) {
  const { priceConfig, dispatch } = props
  return (
    <div style={{ padding: 15 }}>
      <Row>
        <Col xs={24} sm={12}>
          <h2>材料价格</h2>
          <MaterialSetting priceConfig={priceConfig} dispatch={dispatch} />
          <h2>调试工具</h2>
          <Button danger block onClick={clearLocalStorage}>
            清空缓存
          </Button>
        </Col>
      </Row>
    </div>
  )
}
