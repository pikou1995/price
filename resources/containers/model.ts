import { connect } from 'react-redux'
import Model from '../components/model'
import { State } from '../redux'

export default connect(({ model }: State) => ({ model }))(Model)
