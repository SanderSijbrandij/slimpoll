import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'
import fetchPolls from './fetch'
import { loadCookie, saveCookie } from '../../helpers/session-id'

const api = new API()
const polls = api.service('polls')

export default (pollId, answerId, answers) => {
  return (dispatch) => {
    dispatch(clearErrors())
    if (!answerId) {
      dispatch(addError('Voting Error', 'Please select an option.'))
    } else {
      dispatch(loading(true))

      const sessionId = loadCookie() || saveCookie()
      const newAnswers = answers.map((a) => {
        if (a._id == answerId) { a.voteCount++ }
        return a
      })

      // issues with this: race conditions
      polls.patch(pollId, {
        answers: newAnswers,
        $addToSet: { voters: { sessionId: sessionId, answerId: answerId } }
      })
      .catch((err) => {
        // this somehow still throws the update action, making the client think it's voted. it hasn't.
        dispatch(addError('Voting Error', 'Can\'t vote twice.'))
      })
      .then(() => { dispatch(loading(false)) })
    }
  }
}
