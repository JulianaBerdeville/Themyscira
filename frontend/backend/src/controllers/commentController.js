const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var ptBrLanguage = {
  labels: {
    'idiota': -5,
    'escrota': -5,
    'escroto': -5,
    'bunda mole': -5,
    'nojenta': 0,
    'insosa': 0,
    'xoxa': 0,
    'manca': 0,
    'cramunhão': -1,
    'inseta': -1,
    'mocreia': -5,
    'lambisgoia': -5,
    'retardado': -5,
    'pau': -10,
    'pauzinho': 0,
    'pinto': -10,
    'piru': -10,
    'piruzinho': -10,
    'cu': -10,
    'um merda': -10,
    'burrão': -5,
    'cocô': -1,
    'estúpido': -1,
    'estrupício': -10,
    'energúmino': -10,
    'otário': -10,
    'desgraçado': -10,
    'basculho': -10,
    'puta que pariu': -10,
    'filho da puta': -10,
    'caralho': -10,
    'caraio': -10,
    'merda': -10,
    'retardada': -10,
    'animal': -1,
    'corno': -10,
    'bolsonaro': -1,
    'genocida': -1,
    'miliciano': -1,
    'bandido': -1,
    'puto': -10,
    'cuzão': -10,
    'cuzão de merda': -10,
    'seu brocha': -5,
    'seu viado': -5,
    'sua bicha': -5,
    'demônio': -5,
    'uma merda': -10,
    'burrona': -5,
    'estúpida': -1,
    'estrupícia': -10,
    'energúmina': -10,
    'otária': -10,
    'desgraçada': -10,
    'corna': -10,
    'miliciana': -1,
    'bandida': -1,
    'puta': -10,
    'cuzona': -10,
    'quenga': -10,
    'piranha': -5,
    'xexelenta': -5,
    'vadia': -10,
    'vaca': -2,
    'vagabunda': -2,
    'arrombada': -10,
    'cadela': -1,
    'cachorra': -1,
    'buceta': -10,
    'foder': -10,
    'fuder': -10,
    'xereca': -10,
    'greluda': -10,
    'suja': -1,
    'vadiazinha': -10,
    'xerecuda': -10,
    'bucetuda': -10,
    'urubu': -1,
    'banana': -1,
    'pamonha': -1,
    'carniceira': -2,
    'égua': -2,
    'grelo': -10,
  },

}; 

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

    var sendFlag = Boolean;
    const authorId = req.userId;
    const author = (await User.findById(authorId)).populate('author');
    const authorData = [{ username: author.username, id: authorId }];
    sentiment.registerLanguage('pt-br', ptBrLanguage);

    var commentAnalysis = sentiment.analyze(req.body.content, { language: 'pt-br' });
    console.log(commentAnalysis)
    if (commentAnalysis.negative.length > 0 ) {
      sendFlag = true;
    }

    const comment = await Comment.create({ ...req.body, author: authorData, post: postId});

    const commentFromThisPost = (await Comment.find({post: postId}));
    
    await Post.findOneAndUpdate(({_id: postId}), ({comments: commentFromThisPost}), {returnOriginal: false, rawResult: true});

    if (sendFlag) {
      console.log(sendFlag)
      res.status(400).send({ error: 'Comment content invalid or unapropriated.' });

    } else {
      return res.status(200).send({ message: 'Comment created successfully: ', comment });
    }
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