import API from '../../middleware/api'
import loading from '../interface/loading'
import addError from '../interface/add-error'
import clearErrors from '../interface/clear-errors'
import { ObjectId } from 'mongoose'
const api = new API()
const polls = api.service('polls')

export default (pollId, answerId) => {
  return (dispatch) => {
    dispatch(clearErrors())
    if (!answerId) {
      dispatch(addError('Voting Error', 'Please select an option.'))
    } else {
      dispatch(loading(true))

      // answers.INDEX.voteCount works, but can't be interpolated in the query
      polls.update(
        // query
        {
          _id: pollId,
          'answers': {
            '$elemMatch': {
              '_id': ObjectId(answerId)
            }
          }
        },
        // update
        {
          '$inc': {
            'answers.$.voteCount' : 1
          }
        },
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => { dispatch(addError('Voting Error', err.message)); console.error(err) })
      .then(() => { dispatch(loading(false)) })
    }
  }
}
