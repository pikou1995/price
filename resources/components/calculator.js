const { React, antd, ReactRouterDOM } = window
const { Button, message } = antd
const { useParams, useHistory } = ReactRouterDOM
import Cables from './cables'
import Price from './price'
import Report from './report'
import {
  addCable,
  updateCable,
  copyCable,
  deleteCable,
  updatePriceConfig,
  saveOrder,
  fetchPriceConfig,
  fetchOrder,
} from '../redux'

export default function Calculator(props) {
  const { dispatch, priceConfigLoaded, orderLoaded } = props
  const { id } = useParams()
  const history = useHistory()
  if (id) {
    if (!orderLoaded) {
      dispatch(
        fetchOrder(id, () => {
          history.replace('/')
        })
      )
      return null
    }
  } else {
    priceConfigLoaded || dispatch(fetchPriceConfig())
  }

  if (!priceConfigLoaded) return null

  return (
    <div style={{ padding: 15 }}>
      <h2>第一步: 配置规格</h2>
      <Cables
        cables={props.cables}
        setCableConfig={c => dispatch(updateCable(c))}
        addCable={() => dispatch(addCable())}
        copyCable={id => dispatch(copyCable(id))}
        delCable={id => dispatch(deleteCable(id))}
      ></Cables>
      <h2>第二步: 配置价格</h2>
      <Price
        cables={props.cables}
        priceConfig={props.priceConfig}
        setPriceConfig={(c, k, e) =>
          dispatch(updatePriceConfig(c, k, e.target.value))
        }
      ></Price>
      <h2>第三步: 计算结果</h2>
      <Report cables={props.cables} priceConfig={props.priceConfig}></Report>
      <Button
        type="primary"
        block
        onClick={() =>
          dispatch(
            saveOrder(id, ({ id }) => {
              message.success('保存成功')
              id && history.replace('/' + id)
            })
          )
        }
        style={{ marginTop: 24 }}
      >
        保存订单
      </Button>
    </div>
  )
}
