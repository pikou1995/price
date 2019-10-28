const { React, antd } = window
const { Input, Select, Form, Button, Icon } = antd
const { Option } = Select
import config from './config'
const { CORE_TYPE, CORE_NUM, AREA, INSULATION, SHEATH } = config

export default class Cable extends React.Component {
    constructor(props) {
        super(props)
    }

    onChange = (k, v) => {
        this.props.setConfig({
            id: this.props.id,
            [k]: v
        })
    }

    render() {
        return (
            <div>
                <Select
                    placeholder="芯数"
                    style={{ width: 100 }}
                    onChange={this.onChange.bind(this, 'coreNum')}
                >
                    {CORE_NUM.map(c => <Option value={c} key={c}>{c}</Option>)}
                </Select>*
                <Select
                    placeholder="平方"
                    style={{ width: 100 }}
                    onChange={this.onChange.bind(this, 'coreArea')}
                >
                    {AREA.map(a => <Option value={a} key={a}>{a}</Option>)}
                </Select>
                <Select
                    placeholder="金属材料"
                    style={{ width: 100 }}
                    defaultValue="CU"
                    onChange={this.onChange.bind(this, 'coreType')}
                >
                    {Object.keys(CORE_TYPE).map(k => <Option value={k} key={k}>{CORE_TYPE[k]}</Option>)}
                </Select>
                <Select
                    placeholder="绝缘材料"
                    style={{ width: 120 }}
                    onChange={this.onChange.bind(this, 'insulation')}
                >
                    {INSULATION.map(i => <Option value={i} key={i}>{i}</Option>)}
                </Select>
                <Select
                    placeholder="外套材料"
                    style={{ width: 120 }}
                    onChange={this.onChange.bind(this, 'sheath')}
                >
                    {SHEATH.map(s => <Option value={s} key={s}>{s}</Option>)}
                </Select>
            </div>
        )
    }
}