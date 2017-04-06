'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

const setCreatedBy = require('./set-created-by');
const populateCreator = common.populate('createdBy', { service: 'users', field: 'createdBy' })
const creatorNameOnly = common.remove(
  'createdBy.email',
  'createdBy.createdAt',
  'createdBy.updatedAt')

const vote = (hook) => {
  hook.app.service('polls').get(hook.id)
    .then((res) => {
      if (res.voters.indexOf(hook.data.$addToSet.voters) !== -1) {
        hook.data = { }
        return hook
      }
    })
}

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    setCreatedBy()
  ],
  update: [],
  patch: [vote],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ]
};

exports.after = {
  all: [populateCreator, creatorNameOnly],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
