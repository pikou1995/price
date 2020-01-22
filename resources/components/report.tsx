import * as React from 'react'
import { Table, Form, Switch } from 'antd'
import { DENSITY, SWA_WASTE } from '../config'
import { getCableKey } from '../utils'
import { PriceConfig } from '../redux/price-config'
import { Cable } from '../redux/cable/types'
import { Dispatch } from '../redux'
import { CalculatorProps } from './calculator'

class CableReport {
  constructor(private cable: Cable, private priceConfig: PriceConfig) {}

  private toFixed(p: number, num = 2) {
    return isNaN(p) ? '' : p.toFixed(num)
  }

  private drainWireWeight(drainWire: number) {
    return Math.pow(drainWire / 2, 2) * Math.PI * DENSITY.TC
  }

  private segmentedPrice(price: number) {
    return price
      ? [1.1, 1.15, 1.2, 1.25, 1.3].map(r => this.toFixed(r * price)).join('/')
      : ''
  }

  get id(): number {
    return this.cable.id
  }

  get type(): string {
    return getCableKey(this.cable)
  }

  get corePrice(): string {
    const { coreNum, coreArea, coreType, pair } = this.cable
    const { material } = this.priceConfig

    if (!coreNum || !coreArea) {
      return '0'
    }

    const weight = coreNum * coreArea * DENSITY[coreType]
    const p = weight * material[coreType]
    return this.toFixed(pair ? p * 2 : p)
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

  get insulationPrice(): string {
    const { coreNum, coreArea, insulation, pair } = this.cable
    const { insulationWeight, material } = this.priceConfig

    if (!insulation || !coreArea || !coreNum) {
      return '0'
    }

    const p = coreNum * insulationWeight[coreArea] * material[insulation]
    return this.toFixed(pair ? p * 2 : p)
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

  get price() {
    const {
      corePrice,
      micaPrice,
      insulationPrice,
      iscrPrice,
      iDrainWirePrice,
      oscrPrice,
      drainWirePrice,
      innerSheathPrice,
      swaPrice,
      sheathPrice,
    } = this
    return {
      corePrice,
      micaPrice,
      insulationPrice,
      iscrPrice,
      iDrainWirePrice,
      oscrPrice,
      drainWirePrice,
      innerSheathPrice,
      swaPrice,
      sheathPrice,
    }
  }

  get total(): string {
    return this.toFixed(
      Object.values(this.price).reduce(
        (accumulator, currentValue) => accumulator + +currentValue,
        0
      )
    )
  }

  get RMBUp(): string {
    return this.segmentedPrice(+this.total)
  }

  get totalUSD(): string {
    const { exchangeRage } = this.priceConfig
    return this.toFixed(exchangeRage.USD * +this.total)
  }

  get USDUp(): string {
    return this.segmentedPrice(+this.totalUSD)
  }
}

const columns = [
  {
    title: '规格',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '总价RMB',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'RMB上浮10%/15%/20%/25%/30%',
    dataIndex: 'RMBUp',
    key: 'RMBUp',
  },
]

const USDColumns = [
  {
    title: '总价USD',
    dataIndex: 'totalUSD',
    key: 'totalUSD',
  },
  {
    title: 'USD上浮10%/15%/20%/25%/30%',
    dataIndex: 'USDUp',
    key: 'USDUp',
  },
]

const expandedColumns: {
  title: string
  dataIndex: keyof CableReport['price']
  key: keyof CableReport['price']
}[] = [
  {
    title: '金属',
    dataIndex: 'corePrice',
    key: 'corePrice',
  },
  {
    title: '云母',
    dataIndex: 'micaPrice',
    key: 'micaPrice',
  },
  {
    title: '绝缘',
    dataIndex: 'insulationPrice',
    key: 'insulationPrice',
  },
  {
    title: 'ISCR铝箔单屏',
    dataIndex: 'iscrPrice',
    key: 'iscrPrice',
  },
  {
    title: '单排流线',
    dataIndex: 'iDrainWirePrice',
    key: 'iDrainWirePrice',
  },
  {
    title: 'OSCR铝箔总屏蔽',
    dataIndex: 'oscrPrice',
    key: 'oscrPrice',
  },
  {
    title: '总排流线',
    dataIndex: 'drainWirePrice',
    key: 'drainWirePrice',
  },
  {
    title: '内护套',
    dataIndex: 'innerSheathPrice',
    key: 'innerSheathPrice',
  },
  {
    title: '钢丝铠装',
    dataIndex: 'swaPrice',
    key: 'swaPrice',
  },
  {
    title: '外护套',
    dataIndex: 'sheathPrice',
    key: 'sheathPrice',
  },
]

export interface ReportState {
  showUSD: boolean
}

export default class Report extends React.Component<
  CalculatorProps,
  ReportState
> {
  constructor(props: CalculatorProps) {
    super(props)
    this.state = {
      showUSD: false,
    }
  }

  handleToggle = (prop: keyof ReportState) => (enable: boolean) => {
    this.setState({
      [prop]: enable,
    })
  }

  render() {
    const {
      priceConfig: { priceConfig },
      cable: { cables = [] },
    } = this.props
    const data = cables.map(cable => new CableReport(cable, priceConfig))
    const { showUSD } = this.state
    return (
      <div>
        <Form layout="inline">
          <Form.Item label="显示美元价格">
            <Switch checked={showUSD} onChange={this.handleToggle('showUSD')} />
          </Form.Item>
        </Form>
        <Table
          columns={[...columns, ...(showUSD ? USDColumns : [])]}
          dataSource={data}
          rowKey="id"
          pagination={false}
          expandedRowRender={(cable: CableReport) =>
            cable ? (
              <Table
                columns={expandedColumns.filter(
                  ({ dataIndex }) => cable[dataIndex]
                )}
                rowKey={(_: any, i: number) => i + ''}
                dataSource={[cable]}
                pagination={false}
              ></Table>
            ) : null
          }
        />
      </div>
    )
  }
}
