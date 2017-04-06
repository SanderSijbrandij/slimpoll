import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'
import fetchPolls from './fetch'
import cookie from 'react-cookie'

const api = new API()
const polls = api.service('polls')

const COOKIENAME = 'sessionId'

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
        $addToSet: { voters: sessionId }
      })
      .catch((err) => {
        // re-fetch the polls, otherwise state will act strangely because it
        // thinks it's been updated.
        // -> good target for refactoring
        dispatch(fetchPolls())
      })
      .then(() => { dispatch(loading(false)) })
    }
  }
}

const loadCookie = () => { return cookie.load(COOKIENAME) }

const saveCookie = () => {
  const token = createToken()
  cookie.save(COOKIENAME, token, { path: '/', expires: new Date(2035, 1, 1) })
  return token
}

const createToken = () => {
  return (Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2))
}
