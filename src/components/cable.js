const { React, antd } = window
const { Select, Button } = antd
const { Option } = Select
import config from '../config'
const { CORE_TYPE, CORE_NUM, AREA, INSULATION, SHEATH } = config

export default class Cable extends React.Component {
  onChange = (k, v) => {
    this.props.setConfig({
      id: this.props.id,
      [k]: v,
    })
  }

  render() {
    const props = this.props
    return (
      <div>
        <div style={{ paddingBottom: 12 }}>
          <Select
            placeholder="芯数"
            style={{ width: 100 }}
            value={props.coreNum}
            onChange={this.onChange.bind(this, 'coreNum')}
          >
            {CORE_NUM.map(c => (
              <Option value={c} key={c}>
                {c}
              </Option>
            ))}
          </Select>
          *
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
        </div>
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
