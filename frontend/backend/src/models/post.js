const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String, 
    required: true,
  },
  author: {
    type: [Object],
    ref: 'User', //preciso referenciar qual model eu to querendo criar relacao
    require: true,
  },
  comments: [{
    type: [Object],
    ref: 'Comment',
  }],
  CreatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports =  Post;