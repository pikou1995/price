import React from 'react'
import { Input, Form, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import rootStore from '@/store'

export default observer(function Price() {
  const { priceConfig } = rootStore
  return (
    <Form layout="vertical" wrapperCol={{ xs: 24, sm: 12, md: 6 }}>
      <Form.Item label="请输入1RMB兑换多少USD,如:0.14">
        <Input
          type="number"
          prefix="$"
          suffix="USD"
          value={priceConfig!.exchangeRate.USD}
          onChange={(e) =>
            rootStore.updatePriceConfig('exchangeRate', 'USD', e.target.value)
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          icon={<SearchOutlined />}
          ghost
          onClick={() => rootStore.setMaterialDrawerVisible(true)}
        >
          材料价格
        </Button>
      </Form.Item>
    </Form>
  )
})
