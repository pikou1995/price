import React from 'react'
import { message, Row, Col, Button, Popconfirm, Tag } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import Footer from './pages/components/footer'
import rootStore from './store'
import { observer } from 'mobx-react'
import CreateCableModal from './pages/components/create-cable-modal'
import CreatePartModal from './pages/components/create-Part-modal'

message.config({
  top: 100,
  duration: 2,
})

export default observer(function App() {
  const { cableStore } = rootStore
  return (
    <div>
      {cableStore.cables.map((cable) => {
        return (
          <Row key={cable.id} style={{ marginBottom: '16px' }}>
            <Col span={3}>{cable.spec}</Col>
            <Col span={12}>
              {cable.parts.map((p) => (
                <Tag>
                  {p.label}:{p.formula} = {p.inputValue || p.computedValue}
                </Tag>
              ))}
            </Col>
            <Col span={3}>总价:{cable.value}</Col>
            <Col span={3}>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => {
                  cableStore.setCableId(cable.id)
                  cableStore.setCreatePartModalVisible(true)
                }}
              ></Button>
            </Col>
            <Col span={3}>
              <Popconfirm
                title="确认删除？"
                key="delete"
                onConfirm={() => cableStore.delete(cable.id)}
              >
                <Button
                  type="primary"
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                ></Button>
              </Popconfirm>
            </Col>
          </Row>
        )
      })}
      <Row>
        <Col>
          <Button
            type="primary"
            onClick={() =>
              rootStore.cableStore.setCreateCableModalVisible(true)
            }
          >
            创建线缆
          </Button>
        </Col>
      </Row>

      <CreateCableModal />
      <CreatePartModal />
      <Footer />
    </div>
  )
})
