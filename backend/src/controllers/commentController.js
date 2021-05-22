const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


router.use(authMiddleware);

//GET - List all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).send({ comments });
  } catch (error) {
    console.log('error on listing all comments --> ', error);
    res.status(400).send({ error: 'Could not list all comments.' });
  }
});

//GET - List specific comments/comment by post ID
router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentFromThisPost = (await Comment.find({post: postId}));
    res.status(200).send({ commentFromThisPost });
  } catch (error) {
    console.log('error on listing comments from the same post --> ', error);
    res.status(400).send({ error: 'Could not list this specific post.' });
  }
});

//POST - Create new comment based on postId
router.post('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    const authorId = req.userId;
    const author = (await User.findById(authorId)).populate('author');
    const authorData = [{ username: author.username, id: authorId }];


    const comment = await Comment.create({ ...req.body, author: authorData, post: postId});

    const commentFromThisPost = (await Comment.find({post: postId}));
    
    await Post.findOneAndUpdate(({_id: postId}), ({comments: commentFromThisPost}), {returnOriginal: false, rawResult: true});

    return res.status(200).send({ message: 'Comment created successfully: ', comment });

  } catch (error) {
    console.log('error on comment creation --> ', error);
    res.status(400).send({ error: 'Could not create this comment.' });
  }
});

//DELETE - remove specific comment by comment ID
router.delete('/:commentId', async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.commentId);
    res.status(200).send({ message: 'Comment successfully deleted.' });
  } catch (error) {
    console.log('error in delete comment by its id --> ', error);
    res.status(400).send({ error: 'Could not delete this comment.' });
  }
});

module.exports = app => app.use('/comments', router);