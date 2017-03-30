import { FETCHED_POLLS } from '../actions/types'

export default (state = [], { type, payload} = {}) => {
  switch(type) {
    case FETCHED_POLLS:
      return [].concat(payload)

    default:
      return state
  }
}
