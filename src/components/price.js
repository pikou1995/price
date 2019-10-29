const { React, antd } = window
const { Input, Form } = antd

export default class Price extends React.Component {
  genPriceFields = () => {
    const insulations = new Set()
    const insulationWeights = new Set()
    const sheaths = new Set()
    const sheathWeights = new Set()

    this.props.cables.forEach(c => {
      const { coreNum, coreArea, insulation, sheath } = c
      if (!coreNum || !coreArea || !insulation || !sheath) {
        return
      }
      // 绝缘种类
      insulations.add(insulation)
      // 绝缘重量
      insulationWeights.add(coreArea)
      // 外套种类
      sheaths.add(sheath)
      // 外套重量
      sheathWeights.add(`${coreNum}*${coreArea}`)
    })

    return {
      insulations: [...insulations],
      insulationWeights: [...insulationWeights],
      sheaths: [...sheaths],
      sheathWeights: [...sheathWeights],
    }
  }

  render() {
    const {
      insulations,
      insulationWeights,
      sheaths,
      sheathWeights,
    } = this.genPriceFields()

    const {setPriceConfig, priceConfig} = this.props

    return (
      <Form layout="vertical">
        <Form.Item label="请输入铜价格,例如:52000RMB/吨">
          <Input
            type="number"
            prefix="￥"
            suffix="RMB"
            value={priceConfig.core.CU}
            onChange={setPriceConfig.bind(this, 'core', 'CU')}
          />
        </Form.Item>
        {insulations.map(i => {
          return (
            <Form.Item label={`请输入[${i}]绝缘单价`} key={i}>
              <Input
                type="number"
                value={priceConfig.insulation[i]}
                onChange={setPriceConfig.bind(this, 'insulation', i)}
              />
            </Form.Item>
          )
        })}
        {insulationWeights.map(i => {
          return (
            <Form.Item label={`请输入[${i}]绝缘重量`} key={i}>
              <Input
                type="number"
                value={priceConfig.insulationWeight[i]}
                onChange={setPriceConfig.bind(this, 'insulationWeight', i)}
              />
            </Form.Item>
          )
        })}

        {sheaths.map(i => {
          return (
            <Form.Item label={`请输入[${i}]护套单价`} key={i}>
              <Input
                type="number"
                value={priceConfig.sheath[i]}
                onChange={setPriceConfig.bind(this, 'sheath', i)}
              />
            </Form.Item>
          )
        })}
        {sheathWeights.map(i => {
          return (
            <Form.Item label={`请输入[${i}]护套重量`} key={i}>
              <Input
                type="number"
                value={priceConfig.sheathWeight[i]}
                onChange={setPriceConfig.bind(this, 'sheathWeight', i)}
              />
            </Form.Item>
          )
        })}
        <Form.Item label="请输入1RMB兑换多少USD,例如:0.14">
          <Input
            type="number"
            prefix="$"
            suffix="USD"
            value={priceConfig.exchangeRage.USD}
            onChange={setPriceConfig.bind(this, 'exchangeRage', 'USD')}
          />
        </Form.Item>
      </Form>
    )
  }
}
