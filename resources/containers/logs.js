const { ReactRedux } = window
const { connect } = ReactRedux
import Logs from '../components/logs'

export default connect(state => state.logs)(Logs)
