const { React, antd } = window
const { Table } = antd
import config from '../config'
const { DENSITY } = config

function toFixed(p, num = 2) {
  return isNaN(p) ? '' : p.toFixed(num)
}

function corePrice(c, priceConfig) {
  const { coreNum, coreArea, coreType } = c
  const p =
    (coreNum * coreArea * DENSITY[coreType] * priceConfig.core[coreType]) /
    1000000
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

function sheathPrice(c, priceConfig) {
  const { coreNum, coreArea, sheath } = c
  const p =
    priceConfig.sheathWeight[`${coreNum}*${coreArea}`] *
    priceConfig.sheath[sheath]
  return toFixed(p)
}

function micaPrice(c, priceConfig) {
  const { coreNum, mica } = c
  const p = coreNum * mica * priceConfig.mica
  return toFixed(p)
}

function calPrice(cable, priceConfig) {
  if (!priceConfig.exchangeRage.USD) {
    return { id: cable.id }
  }

  const coreP = corePrice(cable, priceConfig)
  const micaP = micaPrice(cable, priceConfig)
  const insulationP = insulationPrice(cable, priceConfig)
  const sheathP = sheathPrice(cable, priceConfig)
  const total = toFixed(+coreP + +micaP + +insulationP + +sheathP)
  const totalUSD = toFixed(priceConfig.exchangeRage.USD * total)

  return {
    id: cable.id,
    type: `${cable.coreNum}*${cable.coreArea}`,
    corePrice: coreP,
    micaPrice: micaP,
    insulationPrice: insulationP,
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
    title: '护套价格',
    dataIndex: 'sheathPrice',
    key: 'sheathPrice',
  },
  {
    title: '总价RMB',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: '总价USD',
    dataIndex: 'totalUSD',
    key: 'totalUSD',
  }
]

export default function Report({ priceConfig, cables }) {
  const data = cables.map(cable => calPrice(cable, priceConfig))
  return <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
}
