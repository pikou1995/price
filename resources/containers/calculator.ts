import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Calculator from '../components/calculator'
import { RootState } from '../redux'

export default withRouter(
  connect(({ priceConfig, cable, model, order }: RootState) => ({
    priceConfig,
    cable,
    model,
    order,
  }))(Calculator)
)
