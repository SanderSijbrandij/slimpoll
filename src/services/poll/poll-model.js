'use strict';

// poll-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  text: { type: String, required: true },
  voteCount: { type: Number, required: true, default: 0 }
});

const voterSchema = new Schema({
  ip: { type: String },
  sessionId: { type: String }
});

const pollSchema = new Schema({
  createdBy: { type: Schema.ObjectId },
  question: { type: String, required: true },
  answers: [answerSchema],
  voters: [voterSchema],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const pollModel = mongoose.model('poll', pollSchema);

module.exports = pollModel;
