import { APP_ERROR } from '../types'

export default (title, message) => {
  return { type: APP_ERROR, payload: { type: title, message }}
}
