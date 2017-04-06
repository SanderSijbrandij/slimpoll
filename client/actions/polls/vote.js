import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'
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

      .catch((err) => { dispatch(addError('Voting Error', err.message)); console.error(err) })
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
