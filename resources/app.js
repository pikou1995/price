const { React, antd, axios, _ } = window
const { Button, Modal } = antd
import Cables from './components/cables'
import Price from './components/price'
import Report from './components/report'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 1,
      cables: [],
      priceConfig: {
        core: {},
        mica: 0.2,
        insulation: {},
        insulationWeight: {},
        sheath: {},
        sheathWeight: {},
        exchangeRage: {},
      },
    }

    const prevState = localStorage.getItem('app')
    if (prevState) {
      try {
        this.state = JSON.parse(prevState)
      } catch (e) {
        localStorage.removeItem('app')
      }
    } else {
      this.fetchPriceConfig()
    }
  }

  fetchPriceConfig = () => {
    axios.get('/api/config').then(res => {
      this.setState({ priceConfig: res.data })
    })
  }

  savePriceConfig = _.debounce(config => {
    axios.put('/api/config', config)
  }, 500)

  addCable = () => {
    const id = this.state.id + 1
    this.setState({
      id,
      cables: [...this.state.cables, { id, coreType: 'CU', mica: '0' }],
    })
  }

  copyCable = targetId => {
    const id = this.state.id + 1
    const cable = this.state.cables.find(c => c.id === targetId)
    this.setState({
      id,
      cables: [...this.state.cables, { ...cable, id: id }],
    })
  }

  delCable = id => {
    const cables = [...this.state.cables]
    const i = cables.findIndex(c => c.id === id)
    cables.splice(i, 1)
    this.setState({ cables })
  }

  setCableConfig = e => {
    const i = this.state.cables.findIndex(c => c.id === e.id)
    const cables = [...this.state.cables]
    cables.splice(i, 1, { ...cables[i], ...e })
    this.setState({ cables }, this.genPriceFields)
  }

  setPriceConfig = (c, k, e) => {
    const v = e.target.value
    const priceConfig = this.state.priceConfig
    this.setState(
      {
        priceConfig: {
          ...priceConfig,
          [c]: {
            ...priceConfig[c],
            [k]: v,
          },
        },
      },
      () => this.savePriceConfig(this.state.priceConfig)
    )
  }

  clearLocalStorage() {
    Modal.confirm({
      title: '确认清空缓存?',
      content: '此操作会丢弃此页面所有进度！',
      onOk() {
        localStorage.clear()
        location.reload()
      },
    })
  }

  componentDidUpdate() {
    localStorage.setItem('app', JSON.stringify(this.state))
  }

  render() {
    const state = this.state
    return (
      <div style={{ padding: 15 }}>
        <h2>第一步: 配置规格</h2>
        <Cables
          cables={state.cables}
          setCableConfig={this.setCableConfig}
          addCable={this.addCable}
          copyCable={this.copyCable}
          delCable={this.delCable}
        ></Cables>
        <h2>第二步: 配置价格</h2>
        <Price
          cables={state.cables}
          priceConfig={state.priceConfig}
          setPriceConfig={this.setPriceConfig}
        ></Price>
        <h2>第三步: 计算结果</h2>
        <Report cables={state.cables} priceConfig={state.priceConfig}></Report>
        <h2>调试工具</h2>
        <Button type="danger" onClick={this.clearLocalStorage}>
          清空缓存
        </Button>
      </div>
    )
  }
}
