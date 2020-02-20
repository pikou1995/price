import * as React from 'react'
import { Input, Form } from 'antd'
import { getCableKey } from '../utils'
import ModelReferenceDrawer from './model-reference-drawer'
import { updatePriceConfig, PriceConfig } from '../redux/price-config'
import { Cable } from '../redux/cable/types'
import { CableProps } from './cable'

interface PriceFields {
  insulationWeights: number[]
  sheathWeights: string[]
  innerSheathWeights: string[]
  iscrWeights: string[]
  oscrWeights: string[]
}

function genPriceFields(cable: Cable): PriceFields {
  const insulationWeights: Set<number> = new Set()
  const sheathWeights: Set<string> = new Set()
  const innerSheathWeights: Set<string> = new Set()
  const iscrWeights: Set<string> = new Set()
  const oscrWeights: Set<string> = new Set()

  const { coreNum, coreArea, innerSheath, pair, iscr, oscr } = cable

  if (coreNum && coreArea) {
    // 绝缘重量
    insulationWeights.add(coreArea)
    // 外护套重量
    const key = getCableKey(cable)
    sheathWeights.add(key)

    if (innerSheath) {
      innerSheathWeights.add(key)
    }

    if (pair) {
      iscr && iscrWeights.add(key)
      oscr && oscrWeights.add(key)
    }
  }

  return {
    insulationWeights: [...insulationWeights],
    iscrWeights: [...iscrWeights],
    oscrWeights: [...oscrWeights],
    innerSheathWeights: [...innerSheathWeights],
    sheathWeights: [...sheathWeights],
  }
}

export default function CablePriceConfigComponent(props: CableProps) {
  const {
    priceConfig: { priceConfig },
    cable,
    dispatch,
  } = props
  const {
    insulationWeights,
    iscrWeights,
    oscrWeights,
    innerSheathWeights,
    sheathWeights,
  } = genPriceFields(cable)

  const setPriceConfig = <K extends keyof PriceConfig>(
    c: K,
    k: string,
    e: any
  ) => dispatch(updatePriceConfig(c, k, e.target.value))

  return (
    <Form labelCol={{ xs: 6 }} wrapperCol={{ xs: 18 }}>
      {insulationWeights.map(i => {
        return (
          <Form.Item label={`绝缘重量`} key={i}>
            <Input
              type="number"
              value={priceConfig.insulationWeight[i + '']}
              onChange={e => setPriceConfig('insulationWeight', i + '', e)}
              suffix={
                priceConfig.insulationWeight[i + ''] ? (
                  <span />
                ) : (
                  <ModelReferenceDrawer
                    {...props}
                    showSheathWeight={false}
                    showOscrWeight={false}
                    spec={i + ''}
                  />
                )
              }
            />
          </Form.Item>
        )
      })}
      {iscrWeights.map(i => {
        return (
          <Form.Item label={`铝箔单屏重量`} key={i}>
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
          <Form.Item label={`铝箔总屏重量`} key={i}>
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
          <Form.Item label={`内护套重量`} key={i}>
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
          <Form.Item label={`外护套重量`} key={i}>
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
    </Form>
  )
}
