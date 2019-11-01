const { ReactRedux } = window
const { connect } = ReactRedux
import Model from '../components/model'

export default connect(state => state)(Model)
