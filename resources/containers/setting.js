const { ReactRedux } = window
const { connect } = ReactRedux
import Setting from '../components/setting'

export default connect(state => state)(Setting)
