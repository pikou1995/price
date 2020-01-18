import { connect } from 'react-redux'
import Logs from '../components/logs'
import { State } from '../redux'

export default connect(({ log }: State) => ({
  log,
}))(Logs)
