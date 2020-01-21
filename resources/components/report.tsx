import * as React from 'react'
import { Table, Form, Switch } from 'antd'
import { DENSITY, SWA_WASTE } from '../config'
import { getCableKey } from '../utils'
import { PriceConfig } from '../redux/price-config'
import { Cable } from '../redux/cable/types'
import { Dispatch } from '../redux'
import { CalculatorProps } from './calculator'

function toFixed(p: number, num = 2) {
  return isNaN(p) ? '' : p.toFixed(num)
}

function corePrice(c: Cable, priceConfig: PriceConfig) {
  const { coreNum, coreArea, coreType, pair } = c
  const weight = coreNum * coreArea * DENSITY[coreType]
  const p = weight * priceConfig.material[coreType]
  return toFixed(pair ? p * 2 : p)
}

function micaPrice(c: Cable, priceConfig: PriceConfig) {
  const { coreNum, mica } = c
  if (mica === 0) {
    return '0'
  }

  const p = coreNum * mica * priceConfig.material.mica
  return toFixed(p)
}

function insulationPrice(c: Cable, priceConfig: PriceConfig) {
  const { coreNum, coreArea, insulation, pair } = c
  const p =
    coreNum *
    priceConfig.insulationWeight[coreArea] *
    priceConfig.material[insulation]
  return toFixed(pair ? p * 2 : p)
}

function iscrPrice(c: Cable, priceConfig: PriceConfig) {
  const { coreNum, pair, iscr } = c

  if (!(pair && iscr)) {
    return '0'
  }

  const key = getCableKey(c)
  const p = priceConfig.material.AL * priceConfig.iscrWeight[key] * coreNum
  return toFixed(p)
}

function drainWireWeight(drainWire: number) {
  return Math.pow(drainWire / 2, 2) * Math.PI * DENSITY.TC
}

function iDrainWirePrice(c: Cable, priceConfig: PriceConfig) {
  const { coreNum, pair, iscr, iDrainWire } = c

  if (!(pair && iscr && iDrainWire)) {
    return '0'
  }

  const p = drainWireWeight(+iDrainWire) * priceConfig.material.TC * coreNum
  return toFixed(p)
}

function oscrPrice(c: Cable, priceConfig: PriceConfig) {
  const { pair, oscr } = c
  if (!(pair && oscr)) {
    return '0'
  }

  const key = getCableKey(c)
  const p = priceConfig.material.AL * priceConfig.oscrWeight[key]
  return toFixed(p)
}

function drainWirePrice(c: Cable, priceConfig: PriceConfig) {
  const { pair, oscr, drainWire } = c

  if (!(pair && oscr && drainWire)) {
    return '0'
  }

  const p = drainWireWeight(+drainWire) * priceConfig.material.TC
  return toFixed(p)
}

function swaPrice(c: Cable, priceConfig: PriceConfig) {
  const { swa, diameter } = c
  if (swa === 0) {
    return '0'
  }
  const num = (+diameter * Math.PI) / swa
  const weight = num * SWA_WASTE * priceConfig.swaWeight[swa]
  const p = weight * priceConfig.material.STEEL
  return toFixed(p)
}

function innerSheathPrice(c: Cable, priceConfig: PriceConfig) {
  const { innerSheath } = c
  if (innerSheath === 0) {
    return '0'
  }

  const key = getCableKey(c)
  const p =
    priceConfig.innerSheathWeight[key] * priceConfig.material[innerSheath]
  return toFixed(p)
}

function sheathPrice(c: Cable, priceConfig: PriceConfig) {
  const { sheath } = c
  const key = getCableKey(c)
  const p = priceConfig.sheathWeight[key] * priceConfig.material[sheath]
  return toFixed(p)
}

/**
 * 各部分的价格
 */
export type CablePrice = {
  corePrice: string
  micaPrice: string
  insulationPrice: string
  iscrPrice: string
  iDrainWirePrice: string
  oscrPrice: string
  drainWirePrice: string
  innerSheathPrice: string
  swaPrice: string
  sheathPrice: string
}

/**
 * 总价等
 */
export type CalPriceResult = {
  id: number
  type?: string
  price?: CablePrice
  total?: string
  totalUSD?: string
}

function calPrice(cable: Cable, priceConfig: PriceConfig): CalPriceResult {
  const { coreNum, coreArea, id } = cable
  if (!coreNum || !coreArea) {
    return { id }
  }
  const price: CablePrice = {
    corePrice: corePrice(cable, priceConfig),
    micaPrice: micaPrice(cable, priceConfig),
    insulationPrice: insulationPrice(cable, priceConfig),
    iscrPrice: iscrPrice(cable, priceConfig),
    iDrainWirePrice: iDrainWirePrice(cable, priceConfig),
    oscrPrice: oscrPrice(cable, priceConfig),
    drainWirePrice: drainWirePrice(cable, priceConfig),
    innerSheathPrice: innerSheathPrice(cable, priceConfig),
    swaPrice: swaPrice(cable, priceConfig),
    sheathPrice: sheathPrice(cable, priceConfig),
  }

  const total = toFixed(
    Object.values(price).reduce(
      (accumulator, currentValue) => accumulator + +currentValue,
      0
    )
  )

  const totalUSD = toFixed(priceConfig.exchangeRage.USD * +total)

  return {
    id: cable.id,
    type: getCableKey(cable),
    price,
    total,
    totalUSD,
  }
}

function segmentedPrice(price: number) {
  return (
    price && [1.1, 1.15, 1.2, 1.25, 1.3].map(r => toFixed(r * price)).join('/')
  )
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
    key: 'RMBUp',
    render: ({ total }: CalPriceResult) => segmentedPrice(+total),
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
    key: 'USDUp',
    render: ({ totalUSD }: CalPriceResult) => segmentedPrice(+totalUSD),
  },
]

const expandedColumns: {
  title: string
  dataIndex: keyof CablePrice
  key: keyof CablePrice
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
    const data = cables.map(cable => calPrice(cable, priceConfig))
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
          expandedRowRender={({ price }: CalPriceResult) =>
            price ? (
              <Table
                columns={expandedColumns.filter(
                  ({ dataIndex }) => price[dataIndex]
                )}
                rowKey={(_: any, i: number) => i + ''}
                dataSource={[price]}
                pagination={false}
              ></Table>
            ) : null
          }
        />
      </div>
    )
  }
}
