const { React, antd } = window
const { Button, Modal } = antd
import Cables from './cables'
import Price from './price'
import Report from './report'
import {
  addCable,
  updateCable,
  copyCable,
  deleteCable,
  updatePriceConfig,
} from '../redux'

export default class Calculator extends React.Component {
  addCable = () => {
    this.props.dispatch(addCable())
  }

  copyCable = id => {
    this.props.dispatch(copyCable(id))
  }

  delCable = id => {
    this.props.dispatch(deleteCable(id))
  }

  setCableConfig = c => {
    this.props.dispatch(updateCable(c))
  }

  setPriceConfig = (c, k, e) => {
    const v = e.target.value
    this.props.dispatch(updatePriceConfig(c, k, v))
  }

  render() {
    const props = this.props
    if (!props.priceConfigLoaded) return null

    return (
      <div style={{ padding: 15 }}>
        <h2>第一步: 配置规格</h2>
        <Cables
          cables={props.cables}
          setCableConfig={this.setCableConfig}
          addCable={this.addCable}
          copyCable={this.copyCable}
          delCable={this.delCable}
        ></Cables>
        <h2>第二步: 配置价格</h2>
        <Price
          cables={props.cables}
          priceConfig={props.priceConfig}
          setPriceConfig={this.setPriceConfig}
        ></Price>
        <h2>第三步: 计算结果</h2>
        <Report cables={props.cables} priceConfig={props.priceConfig}></Report>
      </div>
    )
  }
}
