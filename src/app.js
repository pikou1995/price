const { React, antd } = window
const { Input, Form, Button, Icon, List } = antd
import Cable from './cable'
import Price from './price'

let id = 1

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cables: [{
        id,
        coreType: 'CU',
        // coreNum: 4,
        // coreArea: 2.5,
        // insulation: 'XLPE',
        // sheath: 'WDZ',
      }],
      priceFields: {
        insulation: [],
        insulationWeight: [],
        sheath: [],
        sheathWeight: []
      },
      priceConfig: {
        core: {
          // CU: 52000
        },
        insulation: {},
        insulationWeight: {},
        sheath: {},
        sheathWeight: {},
        exchangeRage: {
          // USD: 0.14
        }
      }
    }
  }

  add = () => {
    this.setState({
      cables: [...this.state.cables, { id: ++id, coreType: 'CU' }]
    })
  }

  setCableConfig = (e) => {
    const i = this.state.cables.findIndex(c => c.id === e.id)
    const cables = [...this.state.cables]
    cables.splice(i, 1, { ...cables[i], ...e })
    this.setState({ cables }, this.genPriceFields)
  }

  genPriceFields = () => {
    const priceFields = {
      insulation: [],
      insulationWeight: [],
      sheath: [],
      sheathWeight: []
    }
    this.state.cables.forEach(c => {
      const { coreNum, coreArea, insulation, sheath } = c
      if (coreNum && coreArea && insulation && sheath) {
        // 绝缘种类
        if (priceFields.insulation.indexOf(insulation) === -1) {
          priceFields.insulation.push(insulation)
        }
        // 绝缘重量
        if (priceFields.insulationWeight.indexOf(coreArea) === -1) {
          priceFields.insulationWeight.push(coreArea)
        }

        // 外套种类
        if (priceFields.sheath.indexOf(sheath) === -1) {
          priceFields.sheath.push(sheath)
        }
        // 外套重量
        const key = `${coreNum}*${coreArea}`
        if (priceFields.sheathWeight.indexOf(key) === -1) {
          priceFields.sheathWeight.push(key)
        }
      }
    })
    this.setState({ priceFields })
  }

  setPriceConfig = (c, k, e) => {
    const v = e.target.value
    const priceConfig = this.state.priceConfig
    this.setState({
      priceConfig: {
        ...priceConfig,
        [c]: {
          ...priceConfig[c],
          [k]: v
        }
      },
    })
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <Form layout="vertical">
          <h2>第一步: 配置规格</h2>
          <List
            dataSource={this.state.cables}
            renderItem={c => (
              <List.Item key={c.id} >
                <Cable {...c} setConfig={this.setCableConfig}></Cable>
              </List.Item>
            )}
          />
          <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
            <Icon type="plus" /> 增加一种线材
                    </Button>
          <h2>第二步: 配置价格</h2>
          <Form.Item label="请输入铜价格,例如:52000RMB/吨">
            <Input
              type="number"
              prefix="￥"
              suffix="RMB"
              onChange={this.setPriceConfig.bind(this, 'core', 'CU')}
            />
          </Form.Item>
          {this.state.priceFields.insulation.map(i => {
            return (
              <Form.Item label={`请输入[${i}]绝缘单价`} key={i} >
                <Input
                  type="number"
                  onChange={this.setPriceConfig.bind(this, 'insulation', i)}
                />
              </Form.Item>
            )
          })}
          {this.state.priceFields.insulationWeight.map(i => {
            return (
              <Form.Item label={`请输入[${i}]绝缘重量`} key={i}>
                <Input
                  type="number"
                  onChange={this.setPriceConfig.bind(this, 'insulationWeight', i)}
                />
              </Form.Item>
            )
          })}

          {this.state.priceFields.sheath.map(i => {
            return (
              <Form.Item label={`请输入[${i}]护套单价`} key={i}>
                <Input
                  type="number"
                  onChange={this.setPriceConfig.bind(this, 'sheath', i)}
                />
              </Form.Item>
            )
          })}
          {this.state.priceFields.sheathWeight.map(i => {
            return (
              <Form.Item label={`请输入[${i}]护套重量`} key={i}>
                <Input
                  type="number"
                  onChange={this.setPriceConfig.bind(this, 'sheathWeight', i)}
                />
              </Form.Item>
            )
          })}
          <Form.Item label="请输入1RMB兑换多少USD,例如:0.14">
            <Input
              type="number"
              prefix="$"
              suffix="USD"
              onChange={this.setPriceConfig.bind(this, 'exchangeRage', 'USD')}
            />
          </Form.Item>
          <h2>第三步: 计算结果</h2>
          <Price cables={this.state.cables} priceConfig={this.state.priceConfig}></Price>
        </Form>
      </div>
    )
  }
}
