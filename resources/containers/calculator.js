const { ReactRedux } = window
const { connect } = ReactRedux
import Calculator from '../components/calculator'

export default connect(state => state)(Calculator)
