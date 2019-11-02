const { React, antd } = window
const { Table } = antd
import { fetchModels } from '../redux'

const columns = [
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    onFilter: (value, record) => record.model === value,
  },
  {
    title: '规格',
    dataIndex: 'spec',
    key: 'spec',
  },
  {
    title: '绝缘重量',
    dataIndex: 'iw',
    key: 'iw',
  },
  {
    title: '护套重量',
    dataIndex: 'sw',
    key: 'sw',
  },
]

export default function Model(props) {
  const { modelsLoaded, models, dispatch } = props

  if (!modelsLoaded) {
    dispatch(fetchModels())
    return null
  }

  columns[0].filters = [...new Set(models.map(m => m.model))].map(m => ({
    text: m,
    value: m,
  }))

  return (
    <div style={{ padding: 15 }}>
      <Table columns={columns} dataSource={models}></Table>
    </div>
  )
}
