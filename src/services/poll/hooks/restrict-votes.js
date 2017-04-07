'use strict'

module.exports = function (hook) {
  const add = hook.data['$addToSet']
  const poll = hook.app.service('polls').get(hook.id)
  .then((res) => {
    if (res.voters.indexOf(add.voters) !== -1) {
      hook.data = {}
      return Promise.reject('can\'t vote twice.')
    }
  })
  return Promise.resolve(poll)
}
