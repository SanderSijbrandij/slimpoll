import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'

import { history } from '../../store'

const api = new API()
const polls = api.service('polls')

export default (poll) => {
  return (dispatch) => {
    dispatch(clearErrors())
    dispatch(loading(true))

    // validations here
    const validation = validatePoll(poll)
    if (!validation.ok) {
      dispatch(addError('Error creating poll', validation.message))
      dispatch(loading(false))
      return false
    }

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

export const validatePoll = (poll) => {
  const { question, answers } = poll

  if (question.length < 5) {
    return { ok: false, message: 'Please enter a Question.' }
  } else if (answers.length < 2) {
    return { ok: false, message: 'Please enter at least 2 possible options. ' }
  }

  return { ok: true }
}
