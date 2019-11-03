const { React, antd } = window
const { Table } = antd
import { fetchModels } from '../redux'

const baseColumns = [
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    filterMultiple: false,
    onFilter: (value, record) => record.model === value,
  },
  {
    title: '规格',
    dataIndex: 'spec',
    key: 'spec',
  },
]

export default function Model(props) {
  const {
    modelsLoaded,
    models,
    dispatch,
    showInsulationWeight = true,
    showSheathWeight = true,
    showOscrWeight = true,
  } = props

  if (!modelsLoaded) {
    dispatch(fetchModels())
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

  columns[0].filters = [...new Set(models.map(m => m.model))].map(m => ({
    text: m,
    value: m,
  }))

  return (
    <div style={props.style || { padding: 15 }}>
      <Table columns={columns} dataSource={models}></Table>
    </div>
  )
}
