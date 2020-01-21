import * as React from 'react'
import { Button, Icon, List } from 'antd'
import Cable from './cable'
import { addCable } from '../redux/cable/actions'
import { Dispatch } from '../redux'
import { CableState } from '../redux/cable/types'

export interface CablesProps {
  dispatch: Dispatch
  cable: CableState
}

export default function Cables(props: CablesProps) {
  const {
    cable: { cables },
    dispatch,
  } = props
  return (
    <List
      dataSource={cables}
      renderItem={c => (
        <List.Item key={c.id}>
          <Cable cable={c} dispatch={dispatch}></Cable>
        </List.Item>
      )}
      footer={
        <Button
          type="dashed"
          onClick={() => dispatch(addCable())}
          style={{ width: '100%' }}
        >
          <Icon type="plus" /> 增加一种线材
        </Button>
      }
    />
  )
}
