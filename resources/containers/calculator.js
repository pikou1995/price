const { ReactRedux, ReactRouterDOM } = window
const { connect } = ReactRedux
const { withRouter } = ReactRouterDOM
import Calculator from '../components/calculator'

export default withRouter(connect(state => state)(Calculator))
