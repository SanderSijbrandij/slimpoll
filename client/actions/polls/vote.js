import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'
import { ObjectId } from 'mongoose'
const api = new API()
const polls = api.service('polls')

export default (pollId, answerId, answers) => {
  return (dispatch) => {
    dispatch(clearErrors())
    if (!answerId) {
      dispatch(addError('Voting Error', 'Please select an option.'))
    } else {
      dispatch(loading(true))

      const newAnswers = answers.map((a) => {
        if (a._id == answerId) { a.voteCount++ }
        return a
      })

      polls.patch(pollId, { answers: newAnswers })
      .catch((err) => { dispatch(addError('Voting Error', err.message)); console.error(err) })
      .then(() => { dispatch(loading(false)) })
    }
  }
}
