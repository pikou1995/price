import * as React from 'react'
import { Button, Upload, Icon, Modal, Row, Col, message } from 'antd'
import MaterialSetting from './material-setting'
import { fetchModels, ModelState, ModelActionTypes } from '../redux/model'
import { ThunkDispatch } from 'redux-thunk'
import { PriceConfigState, PriceConfigActionTypes } from '../redux/price-config'

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
  priceConfigDispatch: ThunkDispatch<
    PriceConfigState,
    undefined,
    PriceConfigActionTypes
  >
  modelDispatch: ThunkDispatch<ModelState, undefined, ModelActionTypes>
  priceConfig: PriceConfigState
}

export default function Setting(props: SettingProps) {
  const { priceConfig, priceConfigDispatch, modelDispatch } = props
  return (
    <div style={{ padding: 15 }}>
      <Row>
        <Col xs={24} sm={12}>
          <h2>材料价格</h2>
          <MaterialSetting
            priceConfig={priceConfig}
            dispatch={priceConfigDispatch}
          />
          <h2>型号管理</h2>
          <Upload name="file" action="/api/models/file" accept=".xls,.xlsx">
            <Button>
              <Icon type="upload" /> 上传报价表文件
            </Button>
          </Upload>
          <Button
            type="primary"
            block
            style={{ margin: '12px 0' }}
            onClick={() =>
              modelDispatch(fetchModels())
                .then(() => message.success('更新成功'))
                .catch((e: Error) => message.error('更新失败:' + e))
            }
          >
            更新型号
          </Button>
          <h2>调试工具</h2>
          <Button type="danger" block onClick={clearLocalStorage}>
            清空缓存
          </Button>
        </Col>
      </Row>
    </div>
  )
}
