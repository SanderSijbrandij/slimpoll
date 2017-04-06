'use strict'

module.exports = function (hook) {
  const add = hook.data['$addToSet']
  const poll = hook.app.service('polls').get(hook.id)
  .then((res) => {
    if (res.voters.indexOf(add.voters) !== -1) {
      hook.data = {}
      throw new Error('Can\t vote twice.')
    }
  })
  return Promise.resolve(poll)
}
