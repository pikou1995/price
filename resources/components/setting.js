const { React, antd } = window
const { Button, Modal, Upload, Icon, Input, Form } = antd
import { fetchPriceConfig, updatePriceConfig } from '../redux'
import { trans } from '../config'

function clearLocalStorage() {
  Modal.confirm({
    title: '确认清空缓存?',
    content: '此操作会丢弃所有计算进度！',
    onOk() {
      localStorage.clear()
      location.reload()
    },
  })
}

export default function Setting(props) {
  const { priceConfigLoaded, dispatch } = props
  if (!priceConfigLoaded) {
    props.dispatch(fetchPriceConfig())
    return null
  }

  const { material } = props.priceConfig
  const keys = Object.keys(material).sort()

  return (
    <div style={{ padding: 15 }}>
      <h2>材料价格</h2>
      <Form layout="vertical">
        {keys.map(i => {
          return (
            <Form.Item label={`请输入[${trans[i] || i}]材料单价`} key={i}>
              <Input
                type="number"
                value={material[i]}
                onChange={e => dispatch(updatePriceConfig('material', i, e.target.value))}
              />
            </Form.Item>
          )
        })}
      </Form>
      {/* <Upload name="file" action="/api/file">
          <Button>
            <Icon type="upload" /> 上传excel文件
          </Button>
        </Upload> */}
      <h2>调试工具</h2>
      <Button type="danger" block onClick={clearLocalStorage}>
        清空缓存
      </Button>
    </div>
  )
}
