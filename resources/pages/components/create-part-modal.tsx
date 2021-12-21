import { FormInstance, Modal } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import rootStore from '@/store'
import PartEditor from './part-editor'
import { Part } from '@/store/cable'

function closeModal() {
  rootStore.cableStore.setCreatePartModalVisible(false)
}

export default observer(function CreateCableModal() {
  const { cableStore } = rootStore
  const formRef = React.createRef<FormInstance<Part>>()

  return (
    <Modal
      title="创建组件"
      visible={cableStore.createPartModalVisible}
      style={{ top: 20 }}
      onOk={async () => {
        await formRef.current?.validateFields()
        const part = formRef.current?.getFieldsValue()
        const cable = cableStore.cables.find((c) => c.id === cableStore.cableId)
        cable?.addPart(part!)
        closeModal()
      }}
      onCancel={() => closeModal()}
    >
      <PartEditor formRef={formRef} />
    </Modal>
  )
})
