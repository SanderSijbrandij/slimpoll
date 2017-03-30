import API from '../../middleware/api'
import { USER_SIGNED_OUT } from '../types'

const api = new API()

export default () => {
  return (dispatch) => {
    api.signOut()
    dispatch({ type: USER_SIGNED_OUT })
  }
}
