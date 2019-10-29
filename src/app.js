const { React, antd } = window
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
    }
  }

  addCable = () => {
    const id = this.state.id + 1
    this.setState({
      id,
      cables: [...this.state.cables, { id, coreType: 'CU' }],
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
    this.setState({
      priceConfig: {
        ...priceConfig,
        [c]: {
          ...priceConfig[c],
          [k]: v,
        },
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
          setPriceConfig={this.setPriceConfig}
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
      </div>
    )
  }
}
