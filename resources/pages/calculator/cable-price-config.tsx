import * as React from 'react'
import { Input, Form, Empty } from 'antd'
import ModelReferenceDrawer from '../components/model-reference-drawer'
import { CableProps } from './cable'
import rootStore from '@/store'
import { PriceConfig } from '@/store/price-config'
import { observer } from 'mobx-react'

export default observer(function CablePriceConfigComponent(props: CableProps) {
  const { cable } = props
  const {
    coreWeights,
    insulationWeights,
    braidedWeights,
    iscrWeights,
    oscrWeights,
    innerSheathWeights,
    sheathWeights,
  } = cable.genPriceFields()

  const { priceConfig } = rootStore

  if (!priceConfig) return null

  const setPriceConfig = <K extends keyof PriceConfig>(
    c: K,
    k: string,
    e: any
  ) => rootStore.updatePriceConfig(c, k, e.target.value)

  return (
    <Form labelCol={{ xs: 6 }} wrapperCol={{ xs: 18 }}>
      {coreWeights.map((i) => {
        return (
          <Form.Item label="芯材重量" key={i}>
            <Input
              type="number"
              value={priceConfig.coreWeight && priceConfig.coreWeight[i]}
              onChange={(e) => setPriceConfig('coreWeight', i, e)}
            />
          </Form.Item>
        )
      })}
      {insulationWeights.map((i) => {
        return (
          <Form.Item label={`绝缘重量`} key={'insulationWeights' + i}>
            <Input
              type="number"
              value={priceConfig.insulationWeight[i + '']}
              onChange={(e) => setPriceConfig('insulationWeight', i + '', e)}
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
      {braidedWeights.map((i) => {
        return (
          <Form.Item label={`编织带重量`} key={'braidedWeights' + i}>
            <Input
              type="number"
              value={priceConfig.braidedWeight[i]}
              onChange={(e) => setPriceConfig('braidedWeight', i, e)}
            />
          </Form.Item>
        )
      })}
      {iscrWeights.map((i) => {
        return (
          <Form.Item label={`铝箔单屏重量`} key={'iscrWeights' + i}>
            <Input
              type="number"
              value={priceConfig.iscrWeight[i]}
              onChange={(e) => setPriceConfig('iscrWeight', i, e)}
            />
          </Form.Item>
        )
      })}
      {oscrWeights.map((i) => {
        return (
          <Form.Item label={`铝箔总屏重量`} key={'oscrWeights' + i}>
            <Input
              type="number"
              value={priceConfig.oscrWeight[i]}
              onChange={(e) => setPriceConfig('oscrWeight', i, e)}
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
      {innerSheathWeights.map((i) => {
        return (
          <Form.Item label={`内护套重量`} key={'innerSheathWeight' + i}>
            <Input
              type="number"
              value={priceConfig.innerSheathWeight[i]}
              onChange={(e) => setPriceConfig('innerSheathWeight', i, e)}
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
      {sheathWeights.map((i) => {
        return (
          <Form.Item label={`外护套重量`} key={'sheathWeight' + i}>
            <Input
              type="number"
              value={priceConfig.sheathWeight[i]}
              onChange={(e) => setPriceConfig('sheathWeight', i, e)}
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
      {Boolean(coreWeights.length) ||
        Boolean(insulationWeights.length) ||
        Boolean(braidedWeights.length) ||
        Boolean(iscrWeights.length) ||
        Boolean(oscrWeights.length) ||
        Boolean(innerSheathWeights.length) ||
        Boolean(sheathWeights.length) || <Empty description="请先配置线材" />}
    </Form>
  )
})
