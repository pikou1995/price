const { React, antd } = window
const { Button, Icon, List } = antd
import Cable from './cable'

export default function Cables(props) {
  return (
    <List
      dataSource={props.cables}
      renderItem={c => (
        <List.Item key={c.id}>
          <Cable
            {...c}
            setConfig={props.setCableConfig}
            copyCable={props.copyCable}
            delCable={props.delCable}
          ></Cable>
        </List.Item>
      )}
      footer={
        <Button
          type="dashed"
          onClick={props.addCable}
          style={{ width: '100%' }}
        >
          <Icon type="plus" /> 增加一种线材
        </Button>
      }
    />
  )
}
