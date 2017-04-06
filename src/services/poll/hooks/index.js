'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

const setCreatedBy = require('./set-created-by');
const restrictVotes = require('./restrict-votes');
const populateCreator = common.populate('createdBy', { service: 'users', field: 'createdBy' })
const creatorNameOnly = common.remove('createdBy.email', 'createdBy.createdAt', 'createdBy.updatedAt')

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
  patch: [restrictVotes],
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
