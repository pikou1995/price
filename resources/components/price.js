const { React, antd } = window
const { Input, Form } = antd
import { getCableKey } from '../utils'

export default class Price extends React.Component {
  genPriceFields = () => {
    const insulationWeights = new Set()
    const sheathWeights = new Set()
    const innerSheathWeights = new Set()
    const iscrWeights = new Set()
    const oscrWeights = new Set()

    this.props.cables.forEach(c => {
      const { coreNum, coreArea, innerSheath, pair, iscr, oscr } = c
      if (!coreNum || !coreArea) {
        return
      }
      // 绝缘重量
      insulationWeights.add(coreArea)
      // 外护套重量
      const key = getCableKey(c)
      sheathWeights.add(key)

      if (innerSheath && innerSheath !== '0') {
        innerSheathWeights.add(key)
      }

      if (pair) {
        iscr && iscrWeights.add(key)
        oscr && oscrWeights.add(key)
      }
    })

    return {
      insulationWeights: [...insulationWeights],
      iscrWeights: [...iscrWeights],
      oscrWeights: [...oscrWeights],
      innerSheathWeights: [...innerSheathWeights],
      sheathWeights: [...sheathWeights],
    }
  }

  render() {
    const {
      insulationWeights,
      iscrWeights,
      oscrWeights,
      innerSheathWeights,
      sheathWeights,
    } = this.genPriceFields()

    const { setPriceConfig, priceConfig } = this.props

    return (
      <Form layout="vertical">
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
        {iscrWeights.map(i => {
          return (
            <Form.Item label={`请输入[${i}]ISCR铝箔单屏重量`} key={i}>
              <Input
                type="number"
                value={priceConfig.iscrWeight[i]}
                onChange={e => setPriceConfig('iscrWeight', i, e)}
              />
            </Form.Item>
          )
        })}
        {oscrWeights.map(i => {
          return (
            <Form.Item label={`请输入[${i}]OSCR铝箔总屏蔽重量`} key={i}>
              <Input
                type="number"
                value={priceConfig.oscrWeight[i]}
                onChange={e => setPriceConfig('oscrWeight', i, e)}
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
