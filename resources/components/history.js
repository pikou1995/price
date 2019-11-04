const { React, antd, ReactRouterDOM } = window
const { Link } = ReactRouterDOM
const { Button, Table, Popconfirm, Divider } = antd
import { fetchOrders, fetchOrder, requestDeleleOrder } from '../redux'

export default function History(props) {
  const { ordersLoaded, dispatch, orders = [] } = props
  !ordersLoaded && dispatch(fetchOrders())

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_, __, i) => i + 1,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      key: 'action',
      render: ({ id }) => [
        <Link to={'/' + id} key="download">
          <Button
            type="primary"
            icon="cloud-download"
            onClick={() => dispatch(fetchOrder(id))}
          />
        </Link>,
        <Divider key="divider" type="vertical" />,
        <Popconfirm
          title="确认删除？"
          key="list-del"
          onConfirm={() => dispatch(requestDeleleOrder(id))}
        >
          <Button type="danger" icon="delete" />
        </Popconfirm>,
      ],
    },
  ]

  return (
    <div style={{ padding: 15 }}>
      <Table columns={columns} dataSource={orders} rowKey="time" />
    </div>
  )
}
