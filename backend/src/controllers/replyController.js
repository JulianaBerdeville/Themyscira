const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const Reply = require('../models/reply');


router.use(authMiddleware);

//GET - List all replies on database
router.get('/', async (req, res) => {
  try {
    const replies = await Reply.find();
    res.status(200).send({ replies });
  } catch (error) {
    console.log('error on listing all replies --> ', error);
    res.status(400).send({ error: 'Could not list all replies.' });
  }
});

//GET - List specific comments/comment by post ID
router.get('/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const repliesFromThisComment = (await Reply.find({comment: commentId}));
    res.status(200).send({ repliesFromThisComment });
  } catch (error) {
    console.log('error on listing replies from the same comment --> ', error);
    res.status(400).send({ error: 'Could not list replies from this comment.' });
  }
});

//POST - Create new reply based on commentId
router.post('/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const authorId = req.userId;
    const author = (await User.findById(authorId)).populate('author');
    const authorData = [{ username: author.username, id: authorId }];


    const reply = await Reply.create({ ...req.body, author: authorData, comment: commentId});

    const repliesFromThisComment = (await Reply.find({comment: commentId}));

    
    await Comment.findOneAndUpdate(({_id: commentId}), ({replies: repliesFromThisComment}), {returnOriginal: false, rawResult: true});

    return res.status(200).send({ message: 'Reply created successfully: ', reply });

  } catch (error) {
    console.log('error on reply creation --> ', error);
    res.status(400).send({ error: 'Could not create this reply.' });
  }
});

//DELETE - remove specific reply by reply ID
router.delete('/:replyId', async (req, res) => {
  try {
    await Reply.findByIdAndRemove(req.params.replyId);
    res.status(200).send({ message: 'Reply successfully deleted.' });
  } catch (error) {
    console.log('error in delete reply by its id --> ', error);
    res.status(400).send({ error: 'Could not delete this reply.' });
  }
});

module.exports = app => app.use('/replies', router);