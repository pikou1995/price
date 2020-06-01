import { connect } from 'react-redux'
import History from '../components/history'
import { RootState } from '../redux'

export default connect(({ order }: RootState) => ({ order }))(History)
