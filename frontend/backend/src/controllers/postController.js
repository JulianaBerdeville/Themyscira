const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Post = require('../models/post');
const User = require('../models/user');
var counter = 0; //o contador inicia zerado
const natural = require('natural');
const SW = require('stopword')
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
     'cramunhao': -1,
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
     'estupido': -1,
     'estruicio': -10,
     'energumino': -10,
     'otario': -10,
     'desgraçado': -10,
     'basculho': -10,
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
     'cuzao': -10,
     'brocha': -5,
     'viado': -5,
     'bicha': -5,
     'demonio': -5,
     'burrona': -5,
     'estupida': -1,
     'estrupicia': -10,
     'energumina': -10,
     'bucetuda': -10, 
     'otaria': -10,
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
     'egua': -2,
     'grelo': -10,
   },
}; 

router.use(authMiddleware);

//GET - List all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ posts });
  } catch (error) {
    res.status(400).send({ error: 'Could not list all posts.' });
  }
});

//GET - List specific post by post ID
router.get('/:postId', async (req, res) => {
  try {
    // const post = await (await Post.findById(req.params.postId)).populate('author');
    const post = (await Post.findById(req.params.postId)).populate('author');
    res.status(200).send({ post });
  } catch (error) {
    console.log('get all posts error --> ', error);
    res.status(400).send({ error: 'Could not list this specific post.' });
  }
});

//POST - Create new post
router.post('/', async (req, res) => {
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
    var post = [];
    const authorId = req.userId;
    const authorUsername = (await User.findById(authorId)).populate('author');
    const authorData = [{ username: authorUsername.username, id: authorId }];
    const { title, content, comments } = req.body;
    sentiment.registerLanguage('pt-br', ptBrLanguage);

    const postContentLowerCase = req.body.content.toLowerCase();
    const postContentWithoutAccentuation = retira_acentos(postContentLowerCase)
    const lowerCaseAndWithoutSpecialChar = postContentWithoutAccentuation.replace(/[^a-zA-Z\s]+/g, '');

    const tokenizer = new natural.AggressiveTokenizerPt();
    const tokenizedReview = tokenizer.tokenize(lowerCaseAndWithoutSpecialChar);
    const filteredReview = SW.removeStopwords(tokenizedReview, SW.ptbr);
    const filteredReviewString = filteredReview.toString();

    var postContentAnalysis = sentiment.analyze(filteredReviewString, { language: 'pt-br' });

    if (postContentAnalysis.score < 0) {
      console.log("This post was reject due it's inapropriate content and was not added to posts Schema.");
      sendFlag = true;
    } else {
      post = await Post.create({ title, content, author: authorData });
      await post.save();
      console.log('post inserted into database. Score is ', postContentAnalysis.score);
    }
    
    if (sendFlag) {
      res.status(400).send({ error: 'Post content invalid or unapropriated.' });
      console.log('score is ', postContentAnalysis.score);
    } else {
      console.log('the post was created --> ', post);
      return res.status(200).send({ message: 'Post created successfully: ', post });
    }

    // var commentAnalysis = sentiment.analyze(req.body.content, { language: 'pt-br' });
    // console.log(commentAnalysis)
    // if (commentAnalysis.negative.length > 0 ) {
    //   sendFlag = true;
    // }
    // const post = await Post.create({ title, content, author: authorData });


    // await post.save();

    // if (sendFlag) {
    //   console.log(sendFlag)
    //   res.status(400).send({ error: 'Comment content invalid or unapropriated.' });

    // } else {
    // return res.status(200).send({ message: 'Post created successfully: ', post });
    // }

  } catch (error) {
    console.log('why did it went wrong --> ', error);
    res.status(400).send({ error: 'Could not create this post.' });
  }
});

//PUT - edit specific post by post ID
router.put('/:postId', async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(req.params.postId,
      {
        title,
        content
      }, { new: true }); //new: true retorna o valor atualizado, o que é util na hora de enviar

    await post.save();

    return res.status(200).send({ message: 'Post edited successfully: ', post });

  } catch (error) {
    console.log('why did it went wrong --> ', error);
    res.status(400).send({ error: 'Could not create this post.' });
  }
});

//POST - send vote by post ID
router.post('/:postId', async (req, res) => {
  try {
      counter ++; 
      const post = await Post.findOneAndUpdate(({_id: req.params.postId}), 
      ({votes: counter}));

      return res.status(200).send({ message: 'You added a vote to this post!: ', post });

  } catch (error) {
    console.log('why did it went wrong --> ', error);
    res.status(400).send({ error: 'Could not vote for this post.' });
  }
});

//DELETE - remove specific post by post ID
router.delete('/:postId', async (req, res) => {
  try {
    const post = await (await Post.findByIdAndRemove(req.params.postId));
    res.status(200).send({ message: 'Post successfully removed!' });
  } catch (error) {
    res.status(400).send({ error: 'Could not delete this specific post.' });
  }
});

module.exports = app => app.use('/posts', router);