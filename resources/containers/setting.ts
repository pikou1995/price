import { connect } from 'react-redux'
import Setting from '../components/setting'
import { RootState, RootActionTypes } from '../redux'
import { Dispatch } from 'react'

const mapStateToProps = ({ priceConfig }: RootState) => ({ priceConfig })
export default connect(mapStateToProps)(Setting)
