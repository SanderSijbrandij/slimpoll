import {
  FETCHED_POLLS, POLL_CREATED, POLL_UPDATED, POLL_REMOVED
} from '../actions/types'

export default (state = [], { type, payload} = {}) => {
  switch(type) {
    case FETCHED_POLLS:
      return [].concat(payload)

    case POLL_CREATED:
      const newPoll = Object.assign({}, payload)
      return [newPoll].concat(state)

    case POLL_UPDATED:
      return state.map((poll) => {
        if (poll._id === payload._id) {
          return Object.assign({}, payload)
        }
        return poll
      })

    case POLL_REMOVED:
      return state.filter((poll) => (poll._id !== payload._id))

    default:
      return state
  }
}
