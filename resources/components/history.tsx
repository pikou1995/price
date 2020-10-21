import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Table, Popconfirm, Divider } from 'antd'
import { fetchOrders, requestDeleleOrder, fetchOrder } from '../redux/order/actions'
import { OrderState, Order } from '../redux/order/types'
import { Dispatch } from '../redux'

export interface HistoryProps {
  dispatch: Dispatch
  order: OrderState
}

export default function History(props: HistoryProps) {
  const {
    dispatch,
    order: { ordersLoaded, orders = [] },
  } = props
  !ordersLoaded && dispatch(fetchOrders())

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: any, i: number) => i + 1,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      key: 'action',
      render: ({ id }: Order) => [
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
          <Button danger icon="delete" />
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
