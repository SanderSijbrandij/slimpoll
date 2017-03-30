import API from '../../middleware/api'
import { USER_SIGNED_OUT } from '../types'
import { history } from '../../store'
import loading from '../interface/loading'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch(loading(true))
    api.signOut()
    dispatch({ type: USER_SIGNED_OUT })
    dispatch(loading(false))
    history.push('/')
  }
}
