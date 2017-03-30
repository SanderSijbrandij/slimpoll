import { APP_LOADING, APP_READY } from '../actions/types'

export default (state = false, { type }) => {
  switch(type) {
    case APP_LOADING:
      return Object.assign({}, { status: true, timer: new Date().getTime()})

    case APP_READY:
      return Object.assign({}, { status: false, timer: new Date().getTime()})

    default:
      return state
  }
}
