const { React, antd } = window
const { List, Button } = antd
import { fetchLogs } from '../redux/logs'

export default function Logs(props) {
  const { dispatch, logs, page, pageSize, total, loading, loaded } = props
  if (!loaded && !loading) {
    dispatch(fetchLogs(page))
  }

  return (
    <div style={{ padding: 15 }}>
      <List
        loading={!loaded}
        dataSource={logs}
        rowKey={log => log}
        renderItem={item => <List.Item>{item}</List.Item>}
        loadMore={
          loading || page * pageSize >= total ? null : (
            <div
              style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
              }}
            >
              <Button
                onClick={() => {
                  dispatch(fetchLogs(page + 1))
                }}
              >
                loading more
              </Button>
            </div>
          )
        }
      />
    </div>
  )
}
