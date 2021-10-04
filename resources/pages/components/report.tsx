import * as React from 'react'
import { Table, Form, Switch } from 'antd'
import { CableReport, CalculationFields } from '@/store/report'
import rootStore from '@/store'
import { observer } from 'mobx-react'

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
]

const USDColumns = [
  {
    title: 'RMB上浮10%/15%/20%/25%/30%',
    dataIndex: 'RMBUp',
    key: 'RMBUp',
  },
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
  dataIndex: keyof CalculationFields<string>
  key: keyof CalculationFields<string>
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
    title: '阻水带',
    dataIndex: 'waterBlockingTapePrice',
    key: 'waterBlockingTapePrice',
  },
  {
    title: '编织带',
    dataIndex: 'braidedPrice',
    key: 'braidedPrice',
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

export default observer(function Report() {
  const { cableStore } = rootStore
  const { cables, showUSD } = cableStore
  const data = cables.map((cable) => cable.report)
  return (
    <div>
      <Form layout="inline">
        <Form.Item label="显示美元价格和上浮价格">
          <Switch
            checked={showUSD}
            onChange={(show) => cableStore.setShowUSD(show)}
          />
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
                ({ dataIndex }) => cable[dataIndex] !== '0'
              )}
              rowKey={() => '1'}
              dataSource={[cable]}
              pagination={false}
            ></Table>
          ) : null
        }
      />
    </div>
  )
})
