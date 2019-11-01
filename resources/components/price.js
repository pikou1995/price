const { React, antd } = window
const { Input, Form } = antd

export default class Price extends React.Component {
  genPriceFields = () => {
    const materials = new Set()
    const insulationWeights = new Set()
    const sheathWeights = new Set()
    const innerSheathWeights = new Set()

    this.props.cables.forEach(c => {
      const { coreNum, coreArea, insulation, sheath, innerSheath } = c
      if (!coreNum || !coreArea || !insulation || !sheath) {
        return
      }
      // 材料种类
      materials.add(insulation)
      materials.add(sheath)
      // 绝缘重量
      insulationWeights.add(coreArea)
      // 外护套重量
      const key = `${coreNum}*${coreArea}`
      sheathWeights.add(key)

      if (innerSheath && innerSheath !== '0') {
        materials.add(innerSheath)
        innerSheathWeights.add(key)
      }
    })

    return {
      materials: [...materials],
      insulationWeights: [...insulationWeights],
      innerSheathWeights: [...innerSheathWeights],
      sheathWeights: [...sheathWeights],
    }
  }

  render() {
    const {
      materials,
      insulationWeights,
      innerSheathWeights,
      sheathWeights,
    } = this.genPriceFields()

    const { setPriceConfig, priceConfig } = this.props

    return (
      <Form layout="vertical">
        <Form.Item label="请输入纯铜价格,例如:52000RMB/吨">
          <Input
            type="number"
            prefix="￥"
            suffix="RMB"
            value={priceConfig.core.CU}
            onChange={e => setPriceConfig('core', 'CU', e)}
          />
        </Form.Item>
        <Form.Item label="请输入镀锡铜价格,例如:50000RMB/吨">
          <Input
            type="number"
            prefix="￥"
            suffix="RMB"
            value={priceConfig.core.TC}
            onChange={e => setPriceConfig('core', 'TC', e)}
          />
        </Form.Item>
        {materials.map(i => {
          return (
            <Form.Item label={`请输入[${i}]材料单价`} key={i}>
              <Input
                type="number"
                value={priceConfig.material[i]}
                onChange={e => setPriceConfig('material', i, e)}
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
                onChange={e => setPriceConfig('insulationWeight', i, e)}
              />
            </Form.Item>
          )
        })}
        {innerSheathWeights.map(i => {
          return (
            <Form.Item label={`请输入[${i}]内护套重量`} key={i}>
              <Input
                type="number"
                value={priceConfig.innerSheathWeight[i]}
                onChange={e => setPriceConfig('innerSheathWeight', i, e)}
              />
            </Form.Item>
          )
        })}
        {sheathWeights.map(i => {
          return (
            <Form.Item label={`请输入[${i}]外护套重量`} key={i}>
              <Input
                type="number"
                value={priceConfig.sheathWeight[i]}
                onChange={e => setPriceConfig('sheathWeight', i, e)}
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
            onChange={e => setPriceConfig('exchangeRage', 'USD', e)}
          />
        </Form.Item>
      </Form>
    )
  }
}
