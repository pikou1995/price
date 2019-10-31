const { React, antd } = window
const { Table, Form, Switch } = antd
import config from '../config'
const { DENSITY, SWA_WASTE } = config

function toFixed(p, num = 2) {
  return isNaN(p) ? '' : p.toFixed(num)
}

function corePrice(c, priceConfig) {
  const { coreNum, coreArea, coreType } = c
  const weight = (coreNum * coreArea * DENSITY[coreType]) / 1e6
  const p = weight * priceConfig.core[coreType]
  return toFixed(p)
}

function micaPrice(c, priceConfig) {
  const { coreNum, mica } = c
  const p = coreNum * mica * priceConfig.mica
  return toFixed(p)
}

function insulationPrice(c, priceConfig) {
  const { coreNum, coreArea, insulation } = c
  const p =
    coreNum *
    priceConfig.insulationWeight[coreArea] *
    priceConfig.insulation[insulation]
  return toFixed(p)
}

function swaPrice(c, priceConfig) {
  const { swa, diameter } = c
  if (swa === '0') {
    return '0'
  }
  const num = (diameter * Math.PI) / swa
  const weight = (num * SWA_WASTE * priceConfig.swaWeight[swa]) / 1e6
  const p = weight * priceConfig.core.STEEL
  return toFixed(p)
}

function sheathPrice(c, priceConfig) {
  const { coreNum, coreArea, sheath } = c
  const p =
    priceConfig.sheathWeight[`${coreNum}*${coreArea}`] *
    priceConfig.sheath[sheath]
  return toFixed(p)
}

function calPrice(cable, priceConfig) {
  if (!priceConfig.exchangeRage.USD) {
    return { id: cable.id }
  }

  const coreP = corePrice(cable, priceConfig)
  const micaP = micaPrice(cable, priceConfig)
  const insulationP = insulationPrice(cable, priceConfig)
  const swaP = swaPrice(cable, priceConfig)
  const sheathP = sheathPrice(cable, priceConfig)
  const total = toFixed(+coreP + +micaP + +insulationP + +swaP + +sheathP)
  const totalUSD = toFixed(priceConfig.exchangeRage.USD * total)

  return {
    id: cable.id,
    type: `${cable.coreNum}*${cable.coreArea}`,
    corePrice: coreP,
    micaPrice: micaP,
    insulationPrice: insulationP,
    swaPrice: swaP,
    sheathPrice: sheathP,
    total,
    totalUSD: totalUSD,
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
    title: 'RMB上浮10%/20%/30%/40%',
    key: 'RMBUp',
    render: ({ total }) =>
      [1.1, 1.2, 1.3, 1.4].map(r => toFixed(r * total)).join('/'),
  },
]

const USDColumns = [
  {
    title: '总价USD',
    dataIndex: 'totalUSD',
    key: 'totalUSD',
  },
  {
    title: 'USD上浮10%/20%/30%/40%',
    key: 'USDUp',
    render: ({ totalUSD }) =>
      [1.1, 1.2, 1.3, 1.4].map(r => toFixed(r * totalUSD)).join('/'),
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
    title: '钢丝铠装',
    dataIndex: 'swaPrice',
    key: 'swaPrice',
  },
  {
    title: '护套价格',
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
    const { priceConfig, cables } = this.props
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
