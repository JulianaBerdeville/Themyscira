const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String, 
    required: true,
  },
  author: {
    type: [Object],
    ref: 'User', //preciso referenciar qual model eu to querendo criar relacao
    require: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    require: true, //preciso referenciar qual model eu to querendo criar relacao
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Replies',
  }],
  CreatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;