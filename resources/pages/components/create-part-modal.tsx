import { FormInstance, Modal } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import rootStore from '@/store'
import PartEditor from './part-editor'
import { Part } from '@/store/cable'

function closeModal() {
  rootStore.cableStore.setCreatePartModalVisible(false)
}

export default observer(function CreatePartModal() {
  const { cableStore } = rootStore
  const formRef =
    React.createRef<FormInstance<Part & { customLabel?: string }>>()

  async function onOk() {
    const form = formRef.current
    if (!form) return
    await form.validateFields()
    const { customLabel, ...part } = form.getFieldsValue()!
    if (customLabel) {
      part.label = customLabel
    }
    const cable = cableStore.cables.find((c) => c.id === cableStore.cableId)
    cable?.addPart(part)
    closeModal()
    form.resetFields()
  }

  return (
    <Modal
      title="创建组件"
      visible={cableStore.createPartModalVisible}
      style={{ top: 20 }}
      onOk={onOk}
      onCancel={closeModal}
    >
      <PartEditor formRef={formRef} onOk={onOk} />
    </Modal>
  )
})