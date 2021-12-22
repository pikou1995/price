import React from 'react'
import { message, Button, Popconfirm, Tag, Space } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import Footer from './pages/components/footer'
import rootStore from './store'
import { observer } from 'mobx-react'
import CreateCableModal from './pages/components/create-cable-modal'
import CreatePartModal from './pages/components/create-Part-modal'
import Layout, { Content } from 'antd/lib/layout/layout'

message.config({
  top: 100,
  duration: 2,
})

export default observer(function App() {
  const { cableStore } = rootStore
  return (
    <Layout>
      <Content style={{ margin: 16 }}>
        {cableStore.cables.map((cable) => {
          return (
            <Space
              key={cable.id}
              style={{ minWidth: '100%', marginBottom: 16 }}
            >
              <span>{cable.spec}</span>
              {cable.parts.map((p) => (
                <Tag key={p.label} closable onClose={() => cable.delPart(p)}>
                  {p.label}:{p.formula}={p.inputValue || p.computedValue}
                </Tag>
              ))}
              <span>总:{cable.value}</span>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => {
                  cableStore.setCableId(cable.id)
                  cableStore.setCreatePartModalVisible(true)
                }}
              ></Button>
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
            </Space>
          )
        })}
        <Button
          type="primary"
          onClick={() => rootStore.cableStore.setCreateCableModalVisible(true)}
        >
          创建线缆
        </Button>
        <CreateCableModal />
        <CreatePartModal />
      </Content>
      <Footer />
    </Layout>
  )
})
