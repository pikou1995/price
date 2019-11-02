const { React, antd } = window
const { Button, Upload, Icon, Modal } = antd
import MaterialSetting from './material-setting'
import { fetchModels } from '../redux'

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
  return (
    <div style={{ padding: 15 }}>
      <h2>材料价格</h2>
      <MaterialSetting {...props} />
      <h2>更新型号</h2>
      <Upload name="file" action="/api/models/file" accept=".xls,.xlsx">
        <Button>
          <Icon type="upload" /> 上传报价表文件
        </Button>
      </Upload>
      <Button
        type="primary"
        block
        style={{ margin: '12px 0' }}
        onClick={() => props.dispatch(fetchModels())}
      >
        更新型号
      </Button>
      <h2>调试工具</h2>
      <Button type="danger" block onClick={clearLocalStorage}>
        清空缓存
      </Button>
    </div>
  )
}
