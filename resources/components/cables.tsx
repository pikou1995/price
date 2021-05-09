import React, { lazy, Suspense } from 'react'
import { Button, Spin } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { addCable } from '../redux/cable/actions'
import { Dispatch } from '../redux'
import { CableState } from '../redux/cable/types'
import { PriceConfigState } from '../redux/price-config'
import { ModelState } from '../redux/model'

const Cable = lazy(
  () =>
    import(
      /* webpackChunkName: "form" */
      './cable'
    )
)

export interface CablesProps {
  dispatch: Dispatch
  cable: CableState
  priceConfig: PriceConfigState
  model: ModelState
}

export interface CablesState {
  mode: 'tab' | 'default'
}

function calMode(): CablesState['mode'] {
  return document.body.clientWidth < 800 ? 'tab' : 'default'
}

const MODE_WIDTH = 900

export default class Cables extends React.Component<CablesProps, CablesState> {
  constructor(props: CablesProps) {
    super(props)
    this.state = { mode: calMode() }
    window.addEventListener('resize', this.updateMode)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMode)
  }

  updateMode = () => {
    this.setState({ mode: calMode() })
  }

  render() {
    const {
      cable: { cables = [] },
      dispatch,
      priceConfig,
      model,
    } = this.props
    return (
      <div>
        {cables.map((c, i) => (
          <Suspense fallback={<Spin />}>
            <Cable
              cable={c}
              dispatch={dispatch}
              priceConfig={priceConfig}
              model={model}
              index={i + 1}
              mode={this.state.mode}
            />
          </Suspense>
        ))}
        <Button
          block
          type="primary"
          ghost
          onClick={() => dispatch(addCable())}
          style={{ margin: '16px 0' }}
        >
          <PlusCircleOutlined /> 增加一种线材
        </Button>
      </div>
    )
  }
}
