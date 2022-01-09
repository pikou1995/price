import React from 'react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Tag, Space, Input } from 'antd'
import { observer } from 'mobx-react'
import CreateCableModal from './components/create-cable-modal'
import CreatePartModal from './components/create-part-modal'
import rootStore from '../store'

export default observer(function Cables() {
  const { cableStore } = rootStore
  return (
    <div>
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
            <span className="spec">{cable.spec}</span>
            {cable.parts.map((p) => (
              <Tag key={p.label} closable onClose={() => cable.delPart(p)}>
                <span className="label">{p.label}</span>:{p.formula}=
                {p.inputValue || p.computedValue}
              </Tag>
            ))}
            <span className="sum">总:{cable.value}</span>
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
        onClick={() => cableStore.setCreateCableModalVisible(true)}
      >
        创建线缆
      </Button>
      <CreateCableModal />
      <CreatePartModal />
    </div>
  )
})
