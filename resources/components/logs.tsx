import * as React from 'react'
import { Table } from 'antd'
import { fetchLogs, Log, LogState, LogActionTypes } from '../redux/log'
import { timeString } from '../utils'
import { ThunkDispatch } from 'redux-thunk'

const columns = [
  {
    key: 'time',
    title: 'time',
    render: ({ time }: Log) => timeString(time),
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

export interface LogProps {
  dispatch: ThunkDispatch<LogState, undefined, LogActionTypes>
  log: LogState
}

export default function Logs(props: LogProps) {
  const {
    dispatch,
    log: { logs, page, pageSize, total, loading, loaded },
  } = props
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
