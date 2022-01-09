import { Form, Modal, Input, FormInstance } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import rootStore from '@/store'
import Keyboard from './keyboard'

function closeModal() {
  rootStore.cableStore.setCreateCableModalVisible(false)
}

export default observer(function CreateCableModal() {
  const { cableStore } = rootStore
  const [form] = Form.useForm<{ spec: string }>()
  function onOk() {
    const spec = form.getFieldValue('spec').replace(/\s/g, '')
    cableStore.create(spec)
    closeModal()
    form.resetFields()
  }
  function handleInput(key: string) {
    let spec = form.getFieldValue('spec')
    switch (key) {
      case '<-': {
        spec = spec.slice(0, -1)
        break
      }
      case 'c': {
        form.resetFields(['spec'])
        return
      }
      case '切换': {
        return
      }
      default: {
        spec += key
      }
    }
    form.setFieldsValue({ spec: spec.replace(/\s/g, '') })
    setTimeout(() => {
      form.getFieldInstance('spec').focus({ cursor: 'end' })
    })
  }

  return (
    <Modal
      title="创建线缆"
      visible={cableStore.createCableModalVisible}
      onOk={onOk}
      onCancel={closeModal}
    >
      <Form form={form}>
        <Form.Item name="spec" initialValue="" rules={[{ required: true }]}>
          <Input
            size="large"
            placeholder="请输入规格, 如 2*1.5"
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
      <Keyboard onClick={handleInput}></Keyboard>
    </Modal>
  )
})
