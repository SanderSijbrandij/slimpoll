import { FETCHED_POLLS } from '../types'
import API from '../../middleware/api'
import loading from '../interface/loading'

const api = new API()
const polls = api.service('polls')

export default () => {
  return (dispatch) => {
    dispatch(loading(true))

    polls.find({})
    .then((res) => {
      dispatch({
        type: FETCHED_POLLS,
        payload: res.data
      })
    })
    .catch((err) => {
      console.error(err.message)
    })
    .then(() => {
      dispatch(loading(false))
    })
  }
}
