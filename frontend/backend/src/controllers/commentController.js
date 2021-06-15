const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const natural = require('natural');
const SW = require('stopword')
 var Sentiment = require('sentiment');
 var sentiment = new Sentiment();
 var ptBrLanguage = {
   labels: {
     'idiota': -5,
     'idiotas': -5,
     'escrota': -5,
     'escrotas': -5,
     'escroto': -5,
     'escrotos': -5,
     'nojentas': 0,
     'nojentos': 0,
     'insosa': 0,
     'insosas': 0,
     'xoxa': 0,
     'xoxas': 0,
     'xoxo': 0,
     'xoxos': 0,
     'manca': 0,
     'mancas': 0,
     'manco': 0,
     'mancos': 0,
     'cramunhao': -1,
     'inseta': -1,
     'mocreia': -5,
     'mocreias': -5,
     'lambisgoia': -5,
     'lambisgoias': -5,
     'retardado': -5,
     'retardados': -5,
     'pau': -10,
     'pauzinho': 0,
     'pinto': -10,
     'piru': -10,
     'piruzinho': -10,
     'cu': -10,
     'cus': -10,
     'burrão': -5,
     'burrões': -5,
     'estupido': -1,
     'estupidos': -1,
     'estupida': -1,
     'estupidas': -1,
     'estrupicio': -10,
     'estrupicios': -10,
     'energumino': -10,
     'energuminos': -10,
     'otario': -10,
     'otarios': -10,
     'desgraçado': -10,
     'desgraçados': -10,
     'basculho': -10,
     'basculhos': -10,
     'caralho': -10,
     'caralhos': -10,
     'caraio': -10,
     'caraios': -10,
     'merda': -10,
     'merdas': -10,
     'retardada': -10,
     'retardadas': -10,
     'animal': -1,
     'corno': -10,
     'cornos': -10,
     'puto': -10,
     'putos': -10,
     'cuzao': -10,
     'brocha': -5,
     'brochas': -5,
     'viado': -5,
     'viados': -5,
     'bicha': -5,
     'bichas': -5,
     'demonio': -5,
     'demonios': -5,
     'burrona': -5,
     'burronas': -5,
     'estrupicia': -10,
     'estrupicias': -10,
     'energumina': -10,
     'energuminas': -10,
     'bucetuda': -10, 
     'bucetudas': -10, 
     'otaria': -10,
     'otarias': -10,
     'desgraçada': -10,
     'desgraçadas': -10,
     'corna': -10,
     'cornas': -10,
     'bandida': -1,
     'bandidas': -1,
     'puta': -10,
     'putas': -10,
     'cuzona': -10,
     'cuzonas': -10,
     'quenga': -10,
     'quengas': -10,
     'piranha': -5,
     'piranhas': -5,
     'xexelenta': -5,
     'xexelentas': -5,
     'vadia': -10,
     'vadias': -10,
     'vagabunda': -2,
     'vagabundas': -2,
     'arrombada': -10,
     'arrombadas': -10,
     'buceta': -10,
     'bucetas': -10,
     'boceta': -10,
     'bocetas': -10,
     'foder': -10,
     'fuder': -10,
     'xereca': -10,
     'xerecas': -10,
     'greluda': -10,
     'greludas': -10,
     'vadiazinha': -10,
     'vadiazinhas': -10,
     'xerecuda': -10,
     'xerecudas': -10,
     'bocetuda': -10,
     'bocetudas': -10,
     'grelo': -10,
     'grelos': -10,
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

    const commentFromThisPost = (await Comment.find({ post: postId }));

    res.status(200).send({ commentFromThisPost });
    console.log('sending data to frontend --> ', commentFromThisPost)
  } catch (error) {
    console.log('error on listing comments from the same post --> ', error);
    
    res.status(400).send({ error: 'Could not list this specific post.' });
  }
});

//POST - Create new comment based on postId
router.post('/:postId', async (req, res) => {

  function retira_acentos(str) {

    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";

    let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";

    let novastr = "";
    for (let i= 0; i < str.length; i++) {
      let troca = false;
      for (let a = 0; a < com_acento.length; a++) {
        if (str.substr(i, 1) === com_acento.substr(a, 1)) {
          novastr += sem_acento.substr(a, 1);
          troca = true;
          break;
        }
      }
      if (troca === false) {
        novastr += str.substr(i, 1);
      }
    }
    return novastr;
  }

  try {
    var sendFlag = false;
    var comment = [];
    const postId = req.params.postId;
    const authorId = req.userId;
    const author = (await User.findById(authorId)).populate('author');
    const authorData = [{ username: author.username, id: authorId }];
    sentiment.registerLanguage('pt-br', ptBrLanguage);

    const commentContentLowerCase = req.body.content.toLowerCase();
    const commentWithoutAccentuation = retira_acentos(commentContentLowerCase)
    const lowerCaseAndWithoutSpecialChar = commentWithoutAccentuation.replace(/[^a-zA-Z\s]+/g, '');

    const tokenizer = new natural.AggressiveTokenizerPt();
    const tokenizedReview = tokenizer.tokenize(lowerCaseAndWithoutSpecialChar);
    const filteredReview = SW.removeStopwords(tokenizedReview, SW.ptbr);
    const filteredReviewString = filteredReview.toString();

    var commentAnalysis = sentiment.analyze(filteredReviewString, { language: 'pt-br' });

    if (commentAnalysis.score < 0) {
      console.log("This comment was reject due it's inapropriate content and was not added to comments Schema.");
      sendFlag = true;
    } else {
      comment = await Comment.create({ ...req.body, author: authorData, post: postId, analysis: commentAnalysis});

      let commentFromThisPost = (await Comment.find({ post: postId }));
  
      await Post.findOneAndUpdate(({ _id: postId }), ({ comments: commentFromThisPost }), { returnOriginal: false, rawResult: true });
      
      console.log('comment inserted into database. Score is ', commentAnalysis.score);
    }
    
    if (sendFlag) {
      res.status(400).send({ error: 'Comment content invalid or unapropriated.' });
      console.log('score is ', commentAnalysis.score);
    } else {
      console.log('the comment was created --> ', comment);
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