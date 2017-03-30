// src/actions/user/sign-in.js
import API from '../../middleware/api'
import { USER_SIGNED_IN } from '../types'
import { history } from '../../store'

import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'

const api = new API()

export default (user) => {
  return (dispatch) => {
    dispatch(clearErrors())
    dispatch(loading(true))

    api.authenticate(user)
    .then((res) => {
      dispatch({
        type: USER_SIGNED_IN,
        payload: res.data
      })
      history.push('/')
    })
    .catch((err) => {
      dispatch(addError('Login Error', err.message))
    })
    .then(() => {
      dispatch(loading(false))
    })
  }
}
