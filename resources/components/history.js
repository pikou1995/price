const { React, antd, ReactRouterDOM } = window
const { Link } = ReactRouterDOM
const { Button, List, Popconfirm } = antd
import { fetchOrders, fetchOrder, requestDeleleOrder } from '../redux'

export default function History(props) {
  const { ordersLoaded, dispatch, orders } = props
  !ordersLoaded && dispatch(fetchOrders())

  return (
    <div style={{ padding: 15 }}>
      <List
        dataSource={orders}
        renderItem={o => (
          <List.Item
            actions={[
              <Link to={'/' + o.id}>
                <Button
                  type="primary"
                  icon="cloud-download"
                  onClick={() => dispatch(fetchOrder(o.id))}
                />
              </Link>,
              <Popconfirm
                title="确认删除？"
                key="list-del"
                onConfirm={() => dispatch(requestDeleleOrder(o.id))}
              >
                <Button type="danger" icon="delete" />
              </Popconfirm>,
            ]}
          >
            <div style={{ width: '70%' }}>{o.time}</div>
          </List.Item>
        )}
      ></List>
    </div>
  )
}
