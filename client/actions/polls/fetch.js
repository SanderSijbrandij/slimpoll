import { FETCHED_POLLS } from '../types'
import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'

const api = new API()
const polls = api.service('polls')

export default () => {
  return (dispatch) => {
    dispatch(clearErrors())
    dispatch(loading(true))

    polls.find({
      query: {
        $limit: 50,
        $sort: { createdAt: -1 }
      }
    })
    .then((res) => {
      dispatch({
        type: FETCHED_POLLS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(addError('Error Retrieving data', err.message))
    })
    .then(() => {
      dispatch(loading(false))
    })
  }
}
