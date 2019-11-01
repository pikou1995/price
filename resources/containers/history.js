const { ReactRedux } = window
const { connect } = ReactRedux
import History from '../components/history'

export default connect(state => state)(History)
