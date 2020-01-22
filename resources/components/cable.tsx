import * as React from 'react'
import { Select, Button, Input, Popconfirm, Checkbox } from 'antd'
const { Option } = Select
import { CORE_TYPE, CORE_NUM, AREA, INSULATION, SWA, SHEATH } from '../config'
import { updateCable, copyCable, deleteCable } from '../redux/cable/actions'
import { PriceConfig } from '../redux/price-config'
import { Cable, CoreType } from '../redux/cable/types'
import { Dispatch } from '../redux'

export interface CableProps {
  dispatch: Dispatch
  cable: Cable
}

export default class CableComponent extends React.Component<CableProps> {
  onChange = <K extends keyof Cable>(k: K) => (v: any) => {
    if (v.target) {
      v = v.target.value
    }

    this.props.dispatch(
      updateCable({
        id: this.props.cable.id,
        [k]: v,
      } as Cable)
    )
  }

  render() {
    const { cable, dispatch } = this.props
    return (
      <div style={{ wordBreak: 'break-word' }}>
        <Select
          placeholder="芯数"
          style={{ width: 80, marginRight: 3, paddingBottom: 12 }}
          value={cable.coreNum}
          onChange={this.onChange('coreNum')}
        >
          {CORE_NUM.map(c => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>
        {cable.pair ? '*2*' : '*'}
        <Select
          placeholder="平方"
          style={{ width: 80, marginLeft: 3, marginRight: 3 }}
          value={cable.coreArea}
          onChange={this.onChange('coreArea')}
        >
          {AREA.map(a => (
            <Option value={a} key={a}>
              {a}
            </Option>
          ))}
        </Select>
        <Checkbox
          checked={cable.pair}
          onChange={e => this.onChange('pair')(e.target.checked)}
        >
          双绞线
        </Checkbox>
        <Select
          placeholder="金属材料"
          style={{ width: 80, marginRight: 3 }}
          value={cable.coreType}
          onChange={this.onChange('coreType')}
        >
          {Object.keys(CORE_TYPE).map((k: CoreType) => (
            <Option value={k} key={k}>
              {CORE_TYPE[k]}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="云母带"
          style={{ width: 100, marginRight: 3 }}
          value={cable.mica}
          onChange={this.onChange('mica')}
        >
          <Option value={0}>无云母带</Option>
          <Option value={1}>一层云母</Option>
          <Option value={2}>二层云母</Option>
        </Select>
        <Select
          placeholder="绝缘材料"
          style={{ width: 110, marginRight: 3, paddingBottom: 12 }}
          value={cable.insulation}
          onChange={this.onChange('insulation')}
        >
          {INSULATION.map(i => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
        {cable.pair && [
          <Checkbox
            key="iscr"
            style={{ paddingBottom: 12 }}
            checked={cable.iscr}
            onChange={e => this.onChange('iscr')(e.target.checked)}
          >
            ISCR铝箔单屏
          </Checkbox>,
          cable.iscr && (
            <Input
              key="iDrainWire"
              style={{ width: 80, marginRight: 3 }}
              value={cable.iDrainWire}
              onChange={e => this.onChange('iDrainWire')(e.target.value)}
              placeholder="单排流线"
            ></Input>
          ),
          <Checkbox
            key="oscr"
            checked={cable.oscr}
            onChange={e => this.onChange('oscr')(e.target.checked)}
          >
            OSCR铝箔总屏蔽
          </Checkbox>,
          cable.oscr && (
            <Input
              key="drainWire"
              style={{ width: 80, marginRight: 3 }}
              value={cable.drainWire}
              onChange={e => this.onChange('drainWire')(e.target.value)}
              placeholder="总排流线"
            ></Input>
          ),
        ]}
        <Select
          placeholder="内护套"
          style={{ width: 110, marginRight: 3, paddingBottom: 12 }}
          value={cable.innerSheath}
          onChange={this.onChange('innerSheath')}
        >
          <Option value={0} key="0">
            无内护套
          </Option>
          {SHEATH.map(i => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="SWA"
          style={{ width: 100, marginRight: 3 }}
          value={cable.swa}
          onChange={this.onChange('swa')}
        >
          <Option value={0}>无SWA</Option>
          {SWA.map(i => (
            <Option value={i} key={i}>
              {i}MM
            </Option>
          ))}
        </Select>
        {cable.swa !== 0 && (
          <Input
            placeholder="直径"
            type="number"
            style={{ width: 100, marginRight: 3 }}
            value={cable.diameter}
            onChange={this.onChange('diameter')}
          />
        )}
        <Select
          placeholder="外护套"
          style={{ width: 110, marginRight: 3 }}
          value={cable.sheath}
          onChange={this.onChange('sheath')}
        >
          {SHEATH.map(s => (
            <Option value={s} key={s}>
              {s}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          icon="copy"
          style={{ marginRight: 3 }}
          onClick={() => dispatch(copyCable(cable.id))}
        />
        <Popconfirm
          title="确认删除？"
          onConfirm={() => dispatch(deleteCable(cable.id))}
        >
          <Button type="danger" icon="delete" />
        </Popconfirm>
      </div>
    )
  }
}