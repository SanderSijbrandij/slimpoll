import { APP_LOADING, APP_READY } from '../types'

export default (status) => {
  return status ? { type: APP_LOADING } : { type: APP_READY }
}
