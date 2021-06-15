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
    const { title, content } = req.body;
    sentiment.registerLanguage('pt-br', ptBrLanguage);

    //análsie do conteudo do post
    const postContentLowerCase = req.body.content.toLowerCase();
    const postContentWithoutAccentuation = retira_acentos(postContentLowerCase)
    const simplifiedPostContent = postContentWithoutAccentuation.replace(/[^a-zA-Z\s]+/g, '');
    
    const contentTokenizer = new natural.AggressiveTokenizerPt();
    const tokenizedPostContent = contentTokenizer.tokenize(simplifiedPostContent);
    const filteredPostContent = SW.removeStopwords(tokenizedPostContent, SW.ptbr);
    const filteredPostContentString = filteredPostContent.toString();

    var postContentAnalysis = sentiment.analyze(filteredPostContentString, { language: 'pt-br' });

    //análise do titulo do post 
    const postTitleLowerCase = req.body.title.toLowerCase();
    const postTitleWithoutAccentuation = retira_acentos(postTitleLowerCase)
    const simplifiedPostTitle = postTitleWithoutAccentuation.replace(/[^a-zA-Z\s]+/g, '');
    
    const titleTokenizer = new natural.AggressiveTokenizerPt();
    const tokenizedPostTitle = titleTokenizer.tokenize(simplifiedPostTitle);
    const filteredPostTitle= SW.removeStopwords(tokenizedPostTitle, SW.ptbr);
    const filteredPostTitleString = filteredPostTitle.toString();

    var postTitleAnalysis = sentiment.analyze(filteredPostTitleString, { language: 'pt-br' });


    console.log ('Analise de sentimento do titlo --> ', postTitleAnalysis.score < 0)
    console.log ('Analise de sentimento do conteudo --> ', postContentAnalysis.score < 0)

    if ((postContentAnalysis.score < 0) || (postTitleAnalysis.score < 0)) {
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