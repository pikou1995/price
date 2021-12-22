import { Form, Modal, Input, FormInstance } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import rootStore from '@/store'

function closeModal() {
  rootStore.cableStore.setCreateCableModalVisible(false)
}

export default observer(function CreateCableModal() {
  const { cableStore } = rootStore
  const [form] = Form.useForm<{ spec: string }>()
  function onOk() {
    const spec = form.getFieldValue('spec')
    cableStore.create(spec)
    closeModal()
    form.resetFields()
  }

  return (
    <Modal
      title="创建线缆"
      visible={cableStore.createCableModalVisible}
      onOk={onOk}
      onCancel={closeModal}
    >
      <Form form={form}>
        <Form.Item name="spec" rules={[{ required: true }]}>
          <Input
            size="large"
            placeholder="请输入规格, 如 2*1.5"
            autoFocus
            onPressEnter={onOk}
            // onChange={(e) => {
            //   // 输入两个空格转 *
            //   if (/  /.test(e.target.value)) {
            //     form.setFieldsValue({
            //       spec: e.target.value.replace(/  /g, '*'),
            //     })
            //   }
            // }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
