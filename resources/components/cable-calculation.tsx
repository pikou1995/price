import * as React from 'react'
import { Tree } from 'antd'
import { CableProps } from './cable'
import { CableReport, CalculationFields } from './report'
import { CodeOutlined, DownOutlined } from '@ant-design/icons'
const { TreeNode } = Tree

const columns: {
  title: string
  dataIndex: keyof CalculationFields<string[]>
}[] = [
  { title: '芯材价格', dataIndex: 'corePrice' },
  { title: '绝缘价格', dataIndex: 'insulationPrice' },
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
      <Tree showLine defaultExpandAll switcherIcon={<DownOutlined />}>
        {columns
          .filter(({ dataIndex }) => result[dataIndex] !== '0')
          .map(({ title, dataIndex }) => (
            <TreeNode title={`${title}: ${result[dataIndex]}`} key={dataIndex}>
              {result.getLog(dataIndex).map((content: string) => (
                <TreeNode
                  title={content}
                  key={content}
                  switcherIcon={<CodeOutlined />}
                />
              ))}
            </TreeNode>
          ))}
        <TreeNode title={`RMB总价: ${result.total}`} />
        <TreeNode title={`RMB上浮10%/15%/20%/25%/30%`}>
          <TreeNode title={result.RMBUp} />
        </TreeNode>
        <TreeNode title={`USD总价: ${result.totalUSD}`} />
        <TreeNode title={`USD上浮10%/15%/20%/25%/30%`}>
          <TreeNode title={result.USDUp} />
        </TreeNode>
      </Tree>
    )
  }
}
