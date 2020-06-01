import * as React from 'react'
import { Input, Form } from 'antd'
import { getCableKey } from '../utils'
import ModelReferenceDrawer from './model-reference-drawer'
import { updatePriceConfig, PriceConfig } from '../redux/price-config'
import { Cable } from '../redux/cable/types'
import { CableProps } from './cable'

type PriceKeys =
  'coreWeights'
  | 'insulationWeights'
  | 'sheathWeights'
  | 'innerSheathWeights'
  | 'iscrWeights'
  | 'oscrWeights'

type PriceFields = Record<PriceKeys, string[]>

function genPriceFields(cable: Cable): PriceFields {
  const coreWeights: string[] = []
  const insulationWeights: string[] = []
  const sheathWeights: string[] = []
  const innerSheathWeights: string[] = []
  const iscrWeights: string[] = []
  const oscrWeights: string[] = []

  const { coreNum, coreArea, innerSheath, iscr, oscr } = cable

  if (coreNum && coreArea) {
    coreWeights.push(coreArea)
    // 绝缘重量
    insulationWeights.push(coreArea)
    // 外护套重量
    const key = getCableKey(cable)
    sheathWeights.push(key)

    if (innerSheath) {
      innerSheathWeights.push(key)
    }

    iscr && iscrWeights.push(key)
    oscr && oscrWeights.push(key)
  }

  return {
    coreWeights,
    insulationWeights,
    iscrWeights,
    oscrWeights,
    innerSheathWeights,
    sheathWeights,
  }
}

export default function CablePriceConfigComponent(props: CableProps) {
  const {
    priceConfig: { priceConfig },
    cable,
    dispatch,
  } = props
  const {
    coreWeights,
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
      {coreWeights.map(i => {
        return (
          <Form.Item label="芯材重量" key={i}>
            <Input
              type="number"
              value={priceConfig.coreWeight && priceConfig.coreWeight[i]}
              onChange={e => setPriceConfig('coreWeight', i, e)}
            />
          </Form.Item>
        )
      })}
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
