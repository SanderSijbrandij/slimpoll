import { POLLS_DATA } from '../actions/types'

export default (state = {}, { type, payload } = {}) => {
  switch(type) {
    case POLLS_DATA:
      return Object.assign({}, payload)

    default:
      return state
  }
}