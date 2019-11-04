const { React, antd } = window
const { Input, Form } = antd
import { getCableKey } from '../utils'
import MaterialSettingDrawer from './material-setting-drawer'
import ModelReferenceDrawer from './model-reference-drawer'
import { updatePriceConfig } from '../redux'

function genPriceFields(cables = []) {
  const insulationWeights = new Set()
  const sheathWeights = new Set()
  const innerSheathWeights = new Set()
  const iscrWeights = new Set()
  const oscrWeights = new Set()

  cables.forEach(c => {
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

export default function Price(props) {
  const { priceConfig, cables, dispatch } = props
  const {
    insulationWeights,
    iscrWeights,
    oscrWeights,
    innerSheathWeights,
    sheathWeights,
  } = genPriceFields(cables)

  const setPriceConfig = (c, k, e) =>
    dispatch(updatePriceConfig(c, k, e.target.value))

  return (
    <Form layout="vertical" wrapperCol={{ xs: 24, sm: 12 }}>
      {insulationWeights.map(i => {
        return (
          <Form.Item label={`请输入[${i}]绝缘重量`} key={i}>
            <Input
              type="number"
              value={priceConfig.insulationWeight[i]}
              onChange={e => setPriceConfig('insulationWeight', i, e)}
              suffix={
                priceConfig.insulationWeight[i] ? (
                  <span />
                ) : (
                  <ModelReferenceDrawer
                    {...props}
                    showSheathWeight={false}
                    showOscrWeight={false}
                    spec={i}
                  />
                )
              }
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
              suffix={
                priceConfig.oscrWeight[i] ? (
                  <span />
                ) : (
                  <ModelReferenceDrawer
                    {...props}
                    showInsulationWeight={false}
                    showSheathWeight={false}
                    spec={i}
                  />
                )
              }
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
              suffix={
                priceConfig.innerSheathWeight[i] ? (
                  <span />
                ) : (
                  <ModelReferenceDrawer
                    {...props}
                    showInsulationWeight={false}
                    showOscrWeight={false}
                    spec={i}
                  />
                )
              }
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
              suffix={
                priceConfig.sheathWeight[i] ? (
                  <span />
                ) : (
                  <ModelReferenceDrawer
                    {...props}
                    showInsulationWeight={false}
                    showOscrWeight={false}
                    spec={i}
                  />
                )
              }
            />
          </Form.Item>
        )
      })}
      <Form.Item label="请输入1RMB兑换多少USD,如:0.14">
        <Input
          type="number"
          prefix="$"
          suffix="USD"
          value={priceConfig.exchangeRage.USD}
          onChange={e => setPriceConfig('exchangeRage', 'USD', e)}
        />
      </Form.Item>
      <Form.Item>
        <MaterialSettingDrawer {...props} />
      </Form.Item>
    </Form>
  )
}
