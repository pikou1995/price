import { connect } from 'react-redux'
import Logs from '../components/logs'
import { RootState } from '../redux'

export default connect(({ log }: RootState) => ({
  log,
}))(Logs)
