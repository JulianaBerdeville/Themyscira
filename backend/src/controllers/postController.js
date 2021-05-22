const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


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
  try {
    const authorId = req.userId;
    const authorUsername = (await User.findById(authorId)).populate('author');
    const authorData = [{ username: authorUsername.username, id: authorId }];

    const { title, content, comments } = req.body;

    const post = await Post.create({ title, content, author: authorData });

    //O trecho abaixo cria um post sem comment, mas cria entradas de comment no MongoDB.
    //Estou passando o comment no body como um array vazio.
    //Não é isso que eu quero. Devo achar uma solução e deletar esse trecho depois.

    //O QUE EU QUERO: Quero criar um post sem comment. Quando o usuário criar um comment,
    //esse comment será associado ao post.
    // await Promise.all(comments.map(async comment => {
    //   const postComment = Comment.create({comment, post: post._id})

    //   await postComment.save();

    //   post.comments.push(postComment);
    // }));

    await post.save();

    return res.status(200).send({ message: 'Post created successfully: ', post });

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