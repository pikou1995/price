const { React, antd } = window
const { Button, Icon, List } = antd
import Cable from './cable'
import { addCable } from '../redux'

export default function Cables(props) {
  const { cables, dispatch } = props
  return (
    <List
      dataSource={cables}
      renderItem={c => (
        <List.Item key={c.id}>
          <Cable {...c} dispatch={dispatch}></Cable>
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
