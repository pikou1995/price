const { React, antd } = window
const { Button, Modal, Upload, Icon } = antd
import MaterialSetting from './material-setting'

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
