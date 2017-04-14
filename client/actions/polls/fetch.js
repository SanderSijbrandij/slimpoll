import { FETCHED_POLLS, POLLS_DATA } from '../types'
import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'

const api = new API()
const polls = api.service('polls')

const defaultLimit = 20

export default (page = false) => {
  return (dispatch) => {
    dispatch(clearErrors())
    dispatch(loading(true))
    
    const skipRecords = page ? (page - 1) * defaultLimit : 0
    
    polls.find({
      query: {
        $limit: defaultLimit,
        $sort: { createdAt: -1 },
        $skip: skipRecords
      }
    })
    .then((res) => {
      const { data, total, skip, limit } = res
      const pollsData = { total, currentPage: (skip/limit + 1), pages: Math.ceil(total/limit) }

      dispatch({
        type: FETCHED_POLLS,
        payload: data
      })
      dispatch({
        type: POLLS_DATA,
        payload: pollsData
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
