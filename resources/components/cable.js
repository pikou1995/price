const { React, antd } = window
const { Select, Button, Input, Popconfirm, Checkbox } = antd
const { Option } = Select
import config from '../config'
const { CORE_TYPE, CORE_NUM, AREA, INSULATION, SWA, SHEATH } = config
import { updateCable, copyCable, deleteCable } from '../redux'

export default class Cable extends React.Component {
  onChange = k => v => {
    if (v.target) {
      v = v.target.value
    }

    this.props.dispatch(
      updateCable({
        id: this.props.id,
        [k]: v,
      })
    )
  }

  render() {
    const props = this.props
    const dispatch = props.dispatch
    return (
      <div style={{ wordBreak: 'break-word' }}>
        <Select
          placeholder="芯数"
          style={{ width: 80, marginRight: 3, paddingBottom: 12 }}
          value={props.coreNum}
          onChange={this.onChange('coreNum')}
        >
          {CORE_NUM.map(c => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>
        {props.pair ? '*2*' : '*'}
        <Select
          placeholder="平方"
          style={{ width: 80, marginLeft: 3, marginRight: 3 }}
          value={props.coreArea}
          onChange={this.onChange('coreArea')}
        >
          {AREA.map(a => (
            <Option value={a} key={a}>
              {a}
            </Option>
          ))}
        </Select>
        <Checkbox
          checked={props.pair}
          onChange={e =>
            props.setConfig({ id: props.id, pair: e.target.checked })
          }
        >
          双绞线
        </Checkbox>
        <Select
          placeholder="金属材料"
          style={{ width: 80, marginRight: 3 }}
          value={props.coreType}
          onChange={this.onChange('coreType')}
        >
          {Object.keys(CORE_TYPE).map(k => (
            <Option value={k} key={k}>
              {CORE_TYPE[k]}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="云母带"
          style={{ width: 100, marginRight: 3 }}
          value={props.mica}
          onChange={this.onChange('mica')}
        >
          <Option value="0">无云母带</Option>
          <Option value="1">一层云母</Option>
          <Option value="2">二层云母</Option>
        </Select>
        <Select
          placeholder="绝缘材料"
          style={{ width: 110, marginRight: 3, paddingBottom: 12 }}
          value={props.insulation}
          onChange={this.onChange('insulation')}
        >
          {INSULATION.map(i => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
        {props.pair && [
          <Checkbox
            key="iscr"
            checked={props.iscr}
            onChange={e =>
              props.setConfig({ id: props.id, iscr: e.target.checked })
            }
          >
            OSCR铝箔单屏
          </Checkbox>,
          <Checkbox
            key="oscr"
            checked={props.oscr}
            onChange={e =>
              props.setConfig({ id: props.id, oscr: e.target.checked })
            }
          >
            OSCR铝箔总屏蔽
          </Checkbox>,
        ]}
        <Select
          placeholder="内护套"
          style={{ width: 110, marginRight: 3, paddingBottom: 12 }}
          value={props.innerSheath}
          onChange={this.onChange('innerSheath')}
        >
          <Option value="0" key="0">
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
          value={props.swa}
          onChange={this.onChange('swa')}
        >
          <Option value="0">无SWA</Option>
          {SWA.map(i => (
            <Option value={i} key={i}>
              {i}MM
            </Option>
          ))}
        </Select>
        {props.swa !== '0' && (
          <Input
            placeholder="直径"
            type="number"
            style={{ width: 100, marginRight: 3 }}
            value={props.diameter}
            onChange={e => this.onChange('diameter')(e.target.value)}
          />
        )}
        <Select
          placeholder="外护套"
          style={{ width: 110, marginRight: 3 }}
          value={props.sheath}
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
          onClick={() => dispatch(copyCable(props.id))}
        />
        <Popconfirm
          title="确认删除？"
          onConfirm={() => dispatch(deleteCable(props.id))}
        >
          <Button type="danger" icon="delete" />
        </Popconfirm>
      </div>
    )
  }
}
