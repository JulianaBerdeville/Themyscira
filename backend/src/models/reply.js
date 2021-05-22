const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const ReplySchema = new mongoose.Schema({
  content: {
    type: String, 
    required: true,
  },
  author: {
   type: [Object],
    ref: 'User', //preciso referenciar qual model eu to querendo criar relacao
    require: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    require: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;