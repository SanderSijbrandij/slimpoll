import { SUBSCRIBED_TO_POLLS_SERVICE } from '../actions/types'

export default (state = false, { type }) => {
  switch(type) {
    case SUBSCRIBED_TO_POLLS_SERVICE:
      return true

    default:
      return state
  }
}
