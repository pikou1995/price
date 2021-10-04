import React from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { observer } from 'mobx-react'
import { Model } from '../../store/models'
import rootStore from '../../store'

const baseColumns: ColumnsType<Model> = [
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    filterMultiple: false,
    onFilter: (value, record) => record.model === value,
    filters: [] as { text: string; value: string }[],
  },
  {
    title: '规格',
    dataIndex: 'spec',
    key: 'spec',
  },
]

export interface ModelProps {
  showInsulationWeight?: boolean
  showSheathWeight?: boolean
  showOscrWeight?: boolean
  spec?: string
  style?: React.CSSProperties
}

export default observer(function ModelComponent(props: ModelProps) {
  const {
    showInsulationWeight = true,
    showSheathWeight = true,
    showOscrWeight = true,
    spec,
  } = props

  let { models } = rootStore.modelStore
  const { modelsLoading } = rootStore.modelStore
  if (!models) {
    !modelsLoading && rootStore.modelStore.resetModels()
    return null
  }

  const columns = [...baseColumns]

  showInsulationWeight &&
    columns.push({
      title: '绝缘重量',
      dataIndex: 'iw',
      key: 'iw',
    })

  showSheathWeight &&
    columns.push({
      title: '护套重量',
      dataIndex: 'sw',
      key: 'sw',
    })

  showOscrWeight &&
    columns.push({
      title: '屏蔽重量',
      dataIndex: 'oscr',
      key: 'oscr',
    })

  if (spec) {
    models = models.filter(
      (m) => m.spec === spec && (!showOscrWeight || m.oscr)
    )
  }
  columns[0].filters = [...new Set(models!.map((m) => m.model))].map((m) => ({
    text: m,
    value: m,
  }))

  return (
    <div style={props.style || { padding: 15 }}>
      <Table columns={columns} dataSource={models} />
    </div>
  )
})
