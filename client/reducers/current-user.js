import { USER_SIGNED_IN, USER_SIGNED_OUT } from '../actions/types'

const CURRENT_USER_KEY = 'slimpoll.currentUser'
const initialState = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case USER_SIGNED_IN :
      const currentUser = Object.assign({}, payload)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))
      return currentUser

    case USER_SIGNED_OUT :
      localStorage.removeItem(CURRENT_USER_KEY)
      return null

    default :
      return state
  }
}
