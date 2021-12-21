import { Form, Modal, Input, FormInstance } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import rootStore from '@/store'

function closeModal() {
  rootStore.cableStore.setCreateCableModalVisible(false)
}

export default observer(function CreateCableModal() {
  const { cableStore } = rootStore
  const formRef = React.useRef<FormInstance>(null)
  return (
    <Modal
      title="创建线缆"
      visible={cableStore.createCableModalVisible}
      onOk={() => {
        const spec = formRef.current?.getFieldValue('spec')
        cableStore.create(spec)
        closeModal()
      }}
      onCancel={() => closeModal()}
    >
      <Form ref={formRef}>
        <Form.Item name="spec" rules={[{ required: true }]}>
          <Input size="large" placeholder="请输入规格, 如 2*1.5" autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  )
})
