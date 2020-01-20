import * as React from 'react'
import { Input, Form } from 'antd'
import {
  fetchPriceConfig,
  updatePriceConfig,
  PriceConfigState,
  PriceConfigActionTypes,
} from '../redux/price-config'
import { trans } from '../config'
import { ThunkDispatch } from 'redux-thunk'

export interface MaterialSettingProps {
  dispatch: ThunkDispatch<PriceConfigState, undefined, PriceConfigActionTypes>
  priceConfig: PriceConfigState
}

export default function MaterialSetting(props: MaterialSettingProps) {
  const {
    dispatch,
    priceConfig: { priceConfigLoaded, priceConfig },
  } = props
  if (!priceConfigLoaded) {
    props.dispatch(fetchPriceConfig())
    return null
  }

  const { material } = priceConfig
  const keys = Object.keys(material).sort()

  return (
    <Form layout="vertical">
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
