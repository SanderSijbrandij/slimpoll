// src/actions/users/sign-up.js
import API from '../../middleware/api'
import { USER_SIGNED_UP } from '../types'
import signIn from './sign-in'
import loading from '../interface/loading'

import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'

const api = new API()
const users = api.service('users')

export default (user) => {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(clearErrors())

    users.create(user)
    .then((res) => {
      dispatch({ type: USER_SIGNED_UP })
      dispatch(signIn(user))
    })
    .catch((err) => {
      dispatch(addError('Error creating User', err.message))
    })
    .then(() => {
      dispatch(loading(false))
    })
  }
}
