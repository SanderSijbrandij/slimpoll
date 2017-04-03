import API from '../../middleware/api'

import {
  POLL_CREATED, POLL_UPDATED, POLL_REMOVED, SUBSCRIBED_TO_POLLS_SERVICE
} from '../types'

const api = new API()
const polls = api.service('polls')

export default () => {
  return (dispatch) => {
    polls.on('created', (poll) => { dispatch(createdRecipe(poll)) })
    polls.on('updated', (poll) => { dispatch(updatedRecipe(poll)) })
    polls.on('patched', (poll) => { dispatch(updatedRecipe(poll)) })
    polls.on('removed', (poll) => { dispatch(removedRecipe(poll)) })

    dispatch({ type: SUBSCRIBED_TO_POLLS_SERVICE })
  }
}

const createdRecipe = (poll) => {
  return {
    type: POLL_CREATED,
    payload: poll
  }
}

const updatedRecipe = (poll) => {
  return {
    type: POLL_UPDATED,
    payload: poll
  }
}

const removedRecipe = (poll) => {
  return {
    type: POLL_REMOVED,
    payload: poll
  }
}
