const { React, antd } = window
const { Table, Form, Switch } = antd
import config from '../config'
const { DENSITY, SWA_WASTE } = config
import { getCableKey } from '../utils'

function toFixed(p, num = 2) {
  return isNaN(p) ? '' : p.toFixed(num)
}

function corePrice(c, priceConfig) {
  const { coreNum, coreArea, coreType, pair } = c
  const weight = coreNum * coreArea * DENSITY[coreType]
  const p = weight * priceConfig.material[coreType]
  return toFixed(pair ? p * 2 : p)
}

function micaPrice(c, priceConfig) {
  const { coreNum, mica } = c
  if (mica === '0') {
    return '0'
  }
  const p = coreNum * mica * priceConfig.material.mica
  return toFixed(p)
}

function insulationPrice(c, priceConfig) {
  const { coreNum, coreArea, insulation, pair } = c
  const p =
    coreNum *
    priceConfig.insulationWeight[coreArea] *
    priceConfig.material[insulation]
  return toFixed(pair ? p * 2 : p)
}

function oscrPrice(c, priceConfig) {
  const { pair, oscr } = c
  if (!(pair && oscr)) {
    return '0'
  }

  const key = getCableKey(c)
  const p = priceConfig.material.AL * priceConfig.oscrWeight[key]
  return toFixed(p)
}

function iscrPrice(c, priceConfig) {
  const { coreNum, pair, iscr } = c

  if (!(pair && iscr)) {
    return '0'
  }

  const key = getCableKey(c)
  const p = priceConfig.material.AL * priceConfig.iscrWeight[key] * coreNum
  return toFixed(p)
}

function swaPrice(c, priceConfig) {
  const { swa, diameter } = c
  if (swa === '0') {
    return '0'
  }
  const num = (diameter * Math.PI) / swa
  const weight = num * SWA_WASTE * priceConfig.swaWeight[swa]
  const p = weight * priceConfig.material.STEEL
  return toFixed(p)
}

function innerSheathPrice(c, priceConfig) {
  const { innerSheath } = c
  if (!innerSheath || innerSheath === '0') {
    return 0
  }

  const key = getCableKey(c)
  const p =
    priceConfig.innerSheathWeight[key] * priceConfig.material[innerSheath]
  return toFixed(p)
}

function sheathPrice(c, priceConfig) {
  const { sheath } = c
  const key = getCableKey(c)
  const p = priceConfig.sheathWeight[key] * priceConfig.material[sheath]
  return toFixed(p)
}

function calPrice(cable, priceConfig) {
  const { coreNum, coreArea, id } = cable
  if (!coreNum || !coreArea) {
    return { id }
  }
  const price = {
    corePrice: corePrice(cable, priceConfig),
    micaPrice: micaPrice(cable, priceConfig),
    insulationPrice: insulationPrice(cable, priceConfig),
    iscrPrice: iscrPrice(cable, priceConfig),
    oscrPrice: oscrPrice(cable, priceConfig),
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

  const totalUSD = toFixed(priceConfig.exchangeRage.USD * total)

  return {
    id: cable.id,
    type: getCableKey(cable),
    ...price,
    total,
    totalUSD,
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
    key: 'RMBUp',
    render: ({ total }) =>
      [1.1, 1.15, 1.2, 1.25, 1.3].map(r => toFixed(r * total)).join('/'),
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
    render: ({ totalUSD }) =>
      [1.1, 1.15, 1.2, 1.25, 1.3].map(r => toFixed(r * totalUSD)).join('/'),
  },
]

const expandedColumns = [
  {
    title: '金属价格',
    dataIndex: 'corePrice',
    key: 'corePrice',
  },
  {
    title: '云母价格',
    dataIndex: 'micaPrice',
    key: 'micaPrice',
  },
  {
    title: '绝缘价格',
    dataIndex: 'insulationPrice',
    key: 'insulationPrice',
  },
  {
    title: 'ISCR铝箔单屏',
    dataIndex: 'iscrPrice',
    key: 'iscrPrice',
  },
  {
    title: 'OSCR铝箔总屏蔽',
    dataIndex: 'oscrPrice',
    key: 'oscrPrice',
  },
  {
    title: '内护套价格',
    dataIndex: 'innerSheathPrice',
    key: 'innerSheathPrice',
  },
  {
    title: '钢丝铠装',
    dataIndex: 'swaPrice',
    key: 'swaPrice',
  },
  {
    title: '外护套价格',
    dataIndex: 'sheathPrice',
    key: 'sheathPrice',
  },
]

export default class Report extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showUSD: false,
    }
  }

  handleToggle = prop => enable => {
    this.setState({
      [prop]: enable,
    })
  }

  render() {
    const { priceConfig, cables = [] } = this.props
    const data = cables.map(cable => calPrice(cable, priceConfig))
    const { showUSD } = this.state
    return (
      <div>
        <Form layout="inline">
          <Form.Item label="计算USD">
            <Switch checked={showUSD} onChange={this.handleToggle('showUSD')} />
          </Form.Item>
        </Form>
        <Table
          columns={[...columns, ...(showUSD ? USDColumns : [])]}
          dataSource={data}
          rowKey="id"
          pagination={false}
          expandedRowRender={c => (
            <Table
              columns={expandedColumns}
              rowKey="id"
              dataSource={[c]}
              pagination={false}
            ></Table>
          )}
        />
      </div>
    )
  }
}
