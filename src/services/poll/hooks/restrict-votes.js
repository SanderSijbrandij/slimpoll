'use strict'

module.exports = function (hook) {
  const add = hook.data['$addToSet']
  const poll = hook.app.service('polls').get(hook.id)
  .then((res) => {
    if (res.voters.filter(voter => {
      return voter.sessionId == add.voters.sessionId
    }).length > 0) 
    {
      hook.data = {}
      return Promise.reject('can\'t vote twice.')
    }
  })
  return Promise.resolve(poll)
}
