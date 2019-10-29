const { React, antd } = window
const { Select, Button, Radio } = antd
const { Option } = Select
import config from '../config'
const { CORE_TYPE, CORE_NUM, AREA, INSULATION, SHEATH } = config

export default class Cable extends React.Component {
  onChange = (k, v) => {
    if (v.target) {
      v = v.target.value
    }
    this.props.setConfig({
      id: this.props.id,
      [k]: v,
    })
  }

  render() {
    const props = this.props
    return (
      <div style={{ wordBreak: 'break-word' }}>
        <Select
          placeholder="芯数"
          style={{ width: 100, paddingBottom: 12 }}
          value={props.coreNum}
          onChange={this.onChange.bind(this, 'coreNum')}
        >
          {CORE_NUM.map(c => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>
        &nbsp;*&nbsp;
        <Select
          placeholder="平方"
          style={{ width: 100 }}
          value={props.coreArea}
          onChange={this.onChange.bind(this, 'coreArea')}
        >
          {AREA.map(a => (
            <Option value={a} key={a}>
              {a}
            </Option>
          ))}
        </Select>
        &nbsp;
          <Select
          placeholder="金属材料"
          style={{ width: 100 }}
          value={props.coreType}
          onChange={this.onChange.bind(this, 'coreType')}
        >
          {Object.keys(CORE_TYPE).map(k => (
            <Option value={k} key={k}>
              {CORE_TYPE[k]}
            </Option>
          ))}
        </Select>
        &nbsp;
        <Radio.Group
          style={{ paddingBottom: 12 }}
          buttonStyle="solid"
          value={props.mica}
          onChange={this.onChange.bind(this, 'mica')}
        >
          <Radio.Button value="0">无</Radio.Button>
          <Radio.Button value="1">一层云母</Radio.Button>
          <Radio.Button value="2">二层云母</Radio.Button>
        </Radio.Group>
        &nbsp;
        <Select
          placeholder="绝缘材料"
          style={{ width: 120 }}
          value={props.insulation}
          onChange={this.onChange.bind(this, 'insulation')}
        >
          {INSULATION.map(i => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
        &nbsp;
        <Select
          placeholder="外套材料"
          style={{ width: 120 }}
          value={props.sheath}
          onChange={this.onChange.bind(this, 'sheath')}
        >
          {SHEATH.map(s => (
            <Option value={s} key={s}>
              {s}
            </Option>
          ))}
        </Select>
        &nbsp;
        <Button
          type="primary"
          icon="copy"
          onClick={() => props.copyCable(props.id)}
        />
        &nbsp;
        <Button
          type="danger"
          icon="delete"
          onClick={() => props.delCable(props.id)}
        />
      </div>
    )
  }
}
