import React from 'react'
import { Input, Form } from 'antd'
import { observer } from 'mobx-react'
import { trans } from '../../config'
import rootStore from '../../store'
import { Material } from '../../store/cable'

export default observer(function MaterialSetting() {
  const { priceConfig } = rootStore

  if (!priceConfig?.material) {
    return null
  }

  const { material } = priceConfig
  const keys = Object.keys(material).sort() as Material[]

  return (
    <Form layout="vertical">
      {keys.map((i) => {
        return (
          <Form.Item label={`${trans[i] || i}单价`} key={i}>
            <Input
              type="number"
              value={material[i]}
              onChange={(e) =>
                rootStore.updatePriceConfig('material', i, +e.target.value)
              }
            />
          </Form.Item>
        )
      })}
    </Form>
  )
})
