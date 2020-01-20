import { connect } from 'react-redux'
import Setting from '../components/setting'
import { State } from '../redux'
import { Dispatch } from 'react'

const mapStateToProps = ({ priceConfig }: State) => ({ priceConfig })
const mapDispatchToProps = (dispatch: Dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Setting)
