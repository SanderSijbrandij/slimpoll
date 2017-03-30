import { APP_ERROR, APP_ERRORS_CLEAR } from '../actions/types'

export default (state = false, { type, payload }) => {
  switch(type) {
    case APP_ERROR:
      return Object.assign({}, payload)

    case APP_ERRORS_CLEAR:
      return false

    default:
      return state
  }
}
