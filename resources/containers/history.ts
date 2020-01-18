import { connect } from 'react-redux'
import History from '../components/history'
import { State } from '../redux'

export default connect(({ order }: State) => ({ order }))(History)
