import React from 'react'
import { Input, Form, Button } from 'antd'
import { updatePriceConfig, PriceConfig } from '../redux/price-config'
import { CalculatorProps } from './calculator'
import { SearchOutlined } from '@ant-design/icons'
import { setMaterialDrawerVisible } from '../redux'

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
          onChange={(e) => setPriceConfig('exchangeRate', 'USD', e)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          icon={<SearchOutlined />}
          ghost
          onClick={() => dispatch(setMaterialDrawerVisible(true))}
        >
          材料价格
        </Button>
      </Form.Item>
    </Form>
  )
}
