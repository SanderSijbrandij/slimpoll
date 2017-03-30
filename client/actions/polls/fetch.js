import { FETCHED_POLLS } from '../types'

import API from '../../middleware/api'

const api = new API()
const polls = api.service('polls')

export default () => {
  return (dispatch) => {
    polls.find()
    .then((res) => {
      console.log(res)
    })
    .catch(() => {
      console.error(err.message)
    })
  }
}
