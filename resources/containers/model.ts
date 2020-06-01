import { connect } from 'react-redux'
import Model from '../components/model'
import { RootState } from '../redux'

export default connect(({ model }: RootState) => ({ model }))(Model)
