import API from '../../middleware/api'
import { USER_SIGNED_OUT } from '../types'
import { history } from '../../store'
import loading from '../interface/loading'
import clearErrors from '../interface/clear-errors'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch(clearErrors())
    dispatch(loading(true))

    api.signOut()
    
    dispatch({ type: USER_SIGNED_OUT })
    dispatch(loading(false))
    history.push('/')
  }
}
