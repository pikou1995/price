import * as React from 'react'
import { CableProps } from './cable'
import { Cable, CoreType } from '../redux/cable/types'
import { updateCable } from '../redux/cable/actions'
import { Form, Switch, Input, Select } from 'antd'
import { CORE_TYPE, INSULATION, SHEATH, SWA } from '../config'
const { Option } = Select

export default class CableConfigComponent extends React.Component<CableProps> {
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
    const { cable } = this.props
    return (
      <Form labelCol={{ xs: 6 }} wrapperCol={{ xs: 18 }}>
        <Form.Item label="双绞线">
          <Switch
            checked={cable.pair}
            onChange={checked => this.onChange('pair')(checked)}
          />
        </Form.Item>
        <Form.Item label="数量">
          <Input
            placeholder="数量"
            value={cable.coreNum}
            onChange={this.onChange('coreNum')}
            suffix={cable.pair ? '对' : ''}
          />
        </Form.Item>
        <Form.Item label="平方">
          <Input
            placeholder="平方"
            value={cable.coreArea}
            onChange={this.onChange('coreArea')}
          />
        </Form.Item>
        <Form.Item label="芯材">
          <Select value={cable.coreType} onChange={this.onChange('coreType')}>
            {Object.keys(CORE_TYPE).map((k) => (
              <Option value={k} key={k}>
                {CORE_TYPE[k as CoreType]}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="云母带">
          <Select
            placeholder="云母带"
            value={cable.mica}
            onChange={this.onChange('mica')}
          >
            <Option value={0}>无</Option>
            <Option value={1}>一层</Option>
            <Option value={2}>二层</Option>
          </Select>
        </Form.Item>
        <Form.Item label="绝缘材料">
          <Select
            value={cable.insulation}
            onChange={this.onChange('insulation')}
          >
            {INSULATION.map(i => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="铝箔单屏" key="iscr">
          <Switch
            checked={cable.iscr}
            onChange={checked => this.onChange('iscr')(checked)}
          />
        </Form.Item>
        {cable.iscr && (
          <Form.Item label="单排流线" key="iDrainWire">
            <Input
              value={cable.iDrainWire}
              onChange={e => this.onChange('iDrainWire')(e.target.value)}
              placeholder="单排流线直径"
            />
          </Form.Item>
        )}
        <Form.Item label="铝箔总屏" key="oscr">
          <Switch
            checked={cable.oscr}
            onChange={checked => this.onChange('oscr')(checked)}
          />
        </Form.Item>
        {cable.oscr && (
          <Form.Item label="总排流线" key="drainWire">
            <Input
              value={cable.drainWire}
              onChange={e => this.onChange('drainWire')(e.target.value)}
              placeholder="总排流线直径"
            />
          </Form.Item>
        )}
        <Form.Item label="内护套">
          <Select
            value={cable.innerSheath}
            onChange={this.onChange('innerSheath')}
          >
            <Option value={0} key="0">
              无
            </Option>
            {SHEATH.map(i => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="SWA">
          <Select value={cable.swa} onChange={this.onChange('swa')}>
            <Option value={0}>无</Option>
            {SWA.map(i => (
              <Option value={i} key={i}>
                {i}MM
              </Option>
            ))}
          </Select>
        </Form.Item>
        {cable.swa !== 0 && (
          <Form.Item label="SWA直径">
            <Input
              placeholder="直径"
              type="number"
              value={cable.diameter}
              onChange={this.onChange('diameter')}
            />
          </Form.Item>
        )}
        <Form.Item label="外护套">
          <Select value={cable.sheath} onChange={this.onChange('sheath')}>
            {SHEATH.map(s => (
              <Option value={s} key={s}>
                {s}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    )
  }
}
