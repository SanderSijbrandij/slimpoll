'use strict';

module.exports = function(options) {
  return function(hook) {
    hook.data.createdBy = hook.params.user._id
  }
}
