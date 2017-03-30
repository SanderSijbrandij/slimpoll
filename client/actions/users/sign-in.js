// src/actions/user/sign-in.js
import API from '../../middleware/api'
import { USER_SIGNED_IN } from '../types'
import loading from '../interface/loading'

const api = new API()

export default (user) => {
  return (dispatch) => {
    dispatch(loading(true))

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
    .then(() => {
      dispatch(loading(false))
    })
  }
}
