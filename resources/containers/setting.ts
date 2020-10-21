import { connect } from 'react-redux'
import Setting from '../components/setting'
import { RootState } from '../redux'

const mapStateToProps = ({ priceConfig }: RootState) => ({ priceConfig })
export default connect(mapStateToProps)(Setting)
