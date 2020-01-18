import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Calculator from '../components/calculator'

export default withRouter(connect(state => state)(Calculator))
