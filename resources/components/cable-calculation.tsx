import * as React from 'react'
import { Form } from 'antd'
import { CableProps } from './cable'
import { CableReport } from './report'
import { Cable } from '../redux/cable/types'
import { PriceConfig } from '../redux/price-config'
import { DENSITY, SWA_WASTE } from '../config'
import { getCableKey } from '../utils'

export class CableCalcation {
  constructor(private cable: Cable, private priceConfig: PriceConfig) {}

  private toFixed(p: number, num = 2) {
    return isNaN(p) ? '' : p.toFixed(num)
  }

  private drainWireWeight(drainWire: number) {
    return Math.pow(drainWire / 2, 2) * Math.PI * DENSITY.TC
  }

  get type(): string {
    return getCableKey(this.cable)
  }

  get corePrice(): string[] {
    const { coreNum, coreArea, coreType, pair } = this.cable
    const { material } = this.priceConfig

    if (!coreNum || !coreArea) {
      return []
    }

    const msg: string[] = []

    const weight = +(coreArea * DENSITY[coreType]).toFixed(1)

    msg.push(
      `${coreType}单位重量: 平方(${coreArea}) * 密度(${DENSITY[coreType]}) = ${weight}.`
    )

    const p = (coreNum * weight * material[coreType]).toFixed(2)

    msg.push(
      `数量(${coreNum}) * 单位重量(${weight}) * ${coreType}单价(${material[coreType]}) = ${p}`
    )

    pair && msg.push(`双绞线 ${p} * 2 = ${+p * 2}`)

    return msg
  }

  get micaPrice(): string {
    const { coreNum, mica } = this.cable
    const { material } = this.priceConfig
    if (mica === 0 || !coreNum) {
      return '0'
    }

    const p = coreNum * mica * material.mica
    return this.toFixed(p)
  }

  get insulationPrice(): string[] {
    const { coreNum, coreArea, insulation, pair } = this.cable
    const { insulationWeight, material } = this.priceConfig

    if (!insulation || !coreArea || !coreNum) {
      return []
    }

    const p = (
      coreNum *
      insulationWeight[coreArea] *
      material[insulation]
    ).toFixed(2)

    let msg: string[] = []
    msg.push(
      `数量(${coreNum}) * ${coreArea}单位重量(${insulationWeight[coreArea]}) * ${insulation}单价(${material[insulation]}) = ${p}`
    )

    pair && msg.push(`双绞线 ${p} * 2 = ${+p * 2}`)

    return msg
  }

  get iscrPrice(): string {
    const { coreNum, pair, iscr } = this.cable
    const { material, iscrWeight } = this.priceConfig

    if (!(pair && iscr) || !coreNum) {
      return '0'
    }

    const p = material.AL * iscrWeight[this.type] * coreNum
    return this.toFixed(p)
  }

  get iDrainWirePrice(): string {
    const { coreNum, pair, iscr, iDrainWire } = this.cable
    const { material } = this.priceConfig

    if (!(pair && iscr && iDrainWire) || !coreNum) {
      return '0'
    }

    const p = this.drainWireWeight(+iDrainWire) * material.TC * coreNum
    return this.toFixed(p)
  }

  get oscrPrice(): string {
    const { pair, oscr } = this.cable
    const { material, oscrWeight } = this.priceConfig
    if (!(pair && oscr)) {
      return '0'
    }

    const p = material.AL * oscrWeight[this.type]
    return this.toFixed(p)
  }

  get drainWirePrice(): string {
    const { coreNum, pair, iscr, iDrainWire } = this.cable
    const { material } = this.priceConfig

    if (!(pair && iscr && iDrainWire) || !coreNum) {
      return '0'
    }

    const p = this.drainWireWeight(+iDrainWire) * material.TC * coreNum
    return this.toFixed(p)
  }

  get innerSheathPrice(): string {
    const { innerSheath } = this.cable
    const { material, innerSheathWeight } = this.priceConfig
    if (innerSheath === 0) {
      return '0'
    }

    const p = innerSheathWeight[this.type] * material[innerSheath]
    return this.toFixed(p)
  }
  get swaPrice(): string {
    const { swa, diameter } = this.cable
    const { material, swaWeight } = this.priceConfig
    if (swa === 0 || !diameter) {
      return '0'
    }
    const num = (+diameter * Math.PI) / swa
    const weight = num * SWA_WASTE * swaWeight[swa]
    const p = weight * material.STEEL
    return this.toFixed(p)
  }

  get sheathPrice(): string {
    const { sheath } = this.cable
    if (!sheath) {
      return '0'
    }
    const { material, sheathWeight } = this.priceConfig
    const p = sheathWeight[this.type] * material[sheath]
    return this.toFixed(p)
  }
}

export default class CableCalculationComponent extends React.Component<
  CableProps
> {
  render() {
    const {
      priceConfig: { priceConfig },
      cable,
    } = this.props
    const process = new CableCalcation(cable, priceConfig)
    const result = new CableReport(cable, priceConfig)

    return (
      <Form>
        <Form.Item label="铜价">
          <div
            dangerouslySetInnerHTML={{ __html: process.corePrice.join('<br>') }}
          ></div>
        </Form.Item>
        <Form.Item label="绝缘价格">
          <div
            dangerouslySetInnerHTML={{
              __html: process.insulationPrice.join('<br>'),
            }}
          ></div>
        </Form.Item>
        <Form.Item label="总价RMB">{result.total}</Form.Item>
        <Form.Item label="RMB上浮10%/15%/20%/25%/30%">{result.RMBUp}</Form.Item>
        <Form.Item label="总价USD">{result.totalUSD}</Form.Item>
        <Form.Item label="USD上浮10%/15%/20%/25%/30%">{result.USDUp}</Form.Item>
      </Form>
    )
  }
}
