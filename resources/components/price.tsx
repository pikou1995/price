import * as React from 'react'
import { Input, Form } from 'antd'
import MaterialSettingDrawer from './material-setting-drawer'
import { updatePriceConfig, PriceConfig } from '../redux/price-config'
import { CalculatorProps } from './calculator'

export default function Price(props: CalculatorProps) {
  const {
    priceConfig: { priceConfig },
    dispatch,
  } = props

  const setPriceConfig = <K extends keyof PriceConfig>(
    c: K,
    k: string,
    e: any
  ) => dispatch(updatePriceConfig(c, k, +e.target.value))

  return (
    <Form layout="vertical" wrapperCol={{ xs: 24, sm: 12, md: 6 }}>
      <Form.Item label="请输入1RMB兑换多少USD,如:0.14">
        <Input
          type="number"
          prefix="$"
          suffix="USD"
          value={priceConfig.exchangeRate.USD}
          onChange={e => setPriceConfig('exchangeRate', 'USD', e)}
        />
      </Form.Item>
      <Form.Item>
        <MaterialSettingDrawer {...props} />
      </Form.Item>
    </Form>
  )
}
