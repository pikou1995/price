const { React, antd } = window
const { Table } = antd
import { fetchLogs } from '../redux/logs'
import { timeString } from '../utils'

const columns = [
  {
    key: 'time',
    title: 'time',
    render: ({ time }) => timeString(time),
  },
  {
    key: 'path',
    title: 'path',
    dataIndex: 'path',
  },
  {
    key: 'userAgent',
    title: 'userAgent',
    dataIndex: 'userAgent',
  },
]

export default function Logs(props) {
  const { dispatch, logs, page, pageSize, total, loading, loaded } = props
  if (!loaded && !loading) {
    dispatch(fetchLogs(page))
  }

  return (
    <div style={{ padding: 15 }}>
      <Table
        columns={columns}
        loading={!loaded}
        dataSource={logs}
        rowKey="time"
        pagination={{ current: page, pageSize, total, showSizeChanger: true }}
        onChange={({ current, pageSize }) =>
          dispatch(fetchLogs(current, pageSize))
        }
      />
    </div>
  )
}
