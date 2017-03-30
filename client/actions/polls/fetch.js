import { FETCHED_POLLS } from '../types'
import API from '../../middleware/api'

const api = new API()
const polls = api.service('polls')

export default () => {
  return (dispatch) => {
    polls.find({})
    .then((res) => {
      dispatch({
        type: FETCHED_POLLS,
        payload: res.data
      })
    })
    .catch(() => {
      console.error(err.message)
    })
  }
}
