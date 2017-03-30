import { APP_LOADING, APP_READY } from '../actions/types'

export default (state = false, { type }) => {
  switch(type) {
    case APP_LOADING:
      return true

    case APP_READY:
      return false

    default:
      return state
  }
}
