const { React, antd } = window
const { Input, Form } = antd
import { fetchPriceConfig, updatePriceConfig } from '../redux'
import { trans } from '../config'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

export default function MaterialSetting(props) {
  const { priceConfigLoaded, dispatch, priceConfig } = props
  if (!priceConfigLoaded) {
    props.dispatch(fetchPriceConfig())
    return null
  }

  const { material } = priceConfig
  const keys = Object.keys(material).sort()

  return (
    <Form {...formItemLayout}>
      {keys.map(i => {
        return (
          <Form.Item label={`${trans[i] || i}单价`} key={i}>
            <Input
              type="number"
              value={material[i]}
              onChange={e =>
                dispatch(updatePriceConfig('material', i, e.target.value))
              }
            />
          </Form.Item>
        )
      })}
    </Form>
  )
}
