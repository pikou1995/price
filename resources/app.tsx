import React from 'react'
import { message, Button, Popconfirm, Tag, Space, Input } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import Footer from './pages/components/footer'
import rootStore from './store'
import { observer } from 'mobx-react'
import CreateCableModal from './pages/components/create-cable-modal'
import CreatePartModal from './pages/components/create-part-modal'
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
        <Space className="cable-line">
          <Input.Search
            placeholder="搜索规格，如 2.5"
            onSearch={(spec) => cableStore.fetchCables(spec)}
            style={{ width: 300 }}
            enterButton
          />
        </Space>
        {cableStore.cables.map((cable) => {
          return (
            <Space className="cable-line" key={cable.id}>
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
