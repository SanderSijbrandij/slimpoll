// src/actions/user/sign-in.js
import API from '../../middleware/api'
import { USER_SIGNED_IN } from '../types'

const api = new API()

export default (user) => {
  return (dispatch) => {
    api.authenticate(user)
    .then((res) => {
      dispatch({
        type: USER_SIGNED_IN,
        payload: res.data
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }
}
