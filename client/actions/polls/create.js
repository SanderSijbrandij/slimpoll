import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'

import { history } from '../../store'

const api = new API()
const polls = api.service('polls')

export default (poll, userId) => {
  return (dispatch) => {
    dispatch(clearErrors())
    dispatch(loading(true))

    api.app.authenticate()
    .then(() => {
      polls.create(poll)
      .then((res) => {
        dispatch(clearErrors())
        const location = 'poll/' + res._id
        history.push(location)
      })
      .catch((err) => { dispatch(addError('Error creating poll', err.message)) })
    })
    .catch((err) => { dispatch(addError('Authentication Error', err.message)) })
    .then(() => { dispatch(loading(false)) })
  }
}
