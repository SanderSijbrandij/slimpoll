// src/actions/users/sign-up.js
import API from '../../middleware/api'
import { USER_SIGNED_UP } from '../types'

const api = new API()
const users = api.service('users')

export default (user) => {
  return (dispatch) => {
    users.create(user)
    .then((res) => {
      dispatch({ type: USER_SIGNED_UP })
    })
    .catch((err) => {
      console.error(err)
    })
  }
}
