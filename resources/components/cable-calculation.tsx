import * as React from 'react'
import { Tree } from 'antd'
import { CableProps } from './cable'
import { CableReport, CalculationFields } from './report'
import { DownOutlined } from '@ant-design/icons'

const columns: {
  title: string
  dataIndex: keyof CalculationFields<string[]>
}[] = [
  { title: '芯材价格', dataIndex: 'corePrice' },
  { title: '绝缘价格', dataIndex: 'insulationPrice' },
  { title: '阻水带', dataIndex: 'waterBlockingTapePrice' },
  { title: '编织带', dataIndex: 'braidedPrice' },
  { title: 'mica云母价格', dataIndex: 'micaPrice' },
  { title: 'iscr铝箔单屏价格', dataIndex: 'iscrPrice' },
  { title: 'oscr铝箔总屏价格', dataIndex: 'oscrPrice' },
  { title: '单排流线价格', dataIndex: 'iDrainWirePrice' },
  { title: '总排流线价格', dataIndex: 'drainWirePrice' },
  { title: 'swa钢丝铠装价格', dataIndex: 'swaPrice' },
  { title: '内护套价格', dataIndex: 'innerSheathPrice' },
  { title: '外护套价格', dataIndex: 'sheathPrice' },
]

export default class CableCalculationComponent extends React.Component<
  CableProps
> {
  render() {
    const {
      priceConfig: { priceConfig },
      cable,
    } = this.props
    const result = new CableReport(cable, priceConfig)

    return (
      <Tree
        showLine={{ showLeafIcon: false }}
        defaultExpandAll
        switcherIcon={<DownOutlined />}
        treeData={[
          ...columns
            .filter(({ dataIndex }) => result[dataIndex] !== '0')
            .map(({ title, dataIndex }) => ({
              title: (
                <span style={{ color: '#40e0d0', fontWeight: 'bold' }}>
                  {`${title}: ${result[dataIndex]}`}
                </span>
              ),
              key: dataIndex,
              children: result.getLog(dataIndex).map((content, i) => ({
                title: content,
                key: content + dataIndex + i,
              })),
            })),
          {
            title: (
              <span style={{ color: '#ff4500', fontWeight: 'bold' }}>
                {`RMB总价: ${result.total}`}
              </span>
            ),
            key: 'title-RMB',
          },
          {
            title: `RMB上浮10%/15%/20%/25%/30%`,
            key: 'title-RMBUp',
            children: [{ title: result.RMBUp, key: 'RMBUp' }],
          },
          {
            title: `USD总价: ${result.totalUSD}`,
            key: 'title-totalUSD',
          },
          {
            title: `USD上浮10%/15%/20%/25%/30%`,
            key: 'title-USDUp',
            children: [{ title: result.USDUp, key: 'USDUp' }],
          },
        ]}
      ></Tree>
    )
  }
}
