const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');


router.use(authMiddleware);

//GET - Allows application to list all users registered
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    console.log('error in get all users --> ', error);
    res.status(400).send({ error: 'Could not list all users.' });
  }
});

//GET - List specific user by userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).send({ user });
  } catch (error) {
    console.log('error in get this specific user --> ', error);
    res.status(400).send({ error: 'Could not list this specific user.' });
  }
});

//DELETE - Allows user to delete hers/his account based on userId
router.delete('/:userId', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.status(200).send({ message: 'Account successfully deleted. See you next time!' });
  } catch (error) {
    console.log('error in delete user by id --> ', error);
    res.status(400).send({ error: 'Could not delete this account.' });
  }
});

//EDIT - Allows user to edit hers/his account
router.put('/:userId', async(req, res) => {
  try {
    const { currentUsername, newUsername } = req.body;

    if (currentUsername === newUsername) { 
      res.status(400).send({ error: 'New name cannot be the same as before.' });
    };

    await User.findByIdAndUpdate(req.params.userId, { username: newUsername },{new: true});

    res.status(200).send({message: 'Name modified successfully.'});
  } catch (error) {
    console.log('caiu no catch');
    console.log('error in editing user  --> ', error);
    res.status(400).send({error: 'Could not modify name.'});
  }
});

module.exports = app =>  app.use('/users', router) //passando o prefixo 'user' pra esse router

//Esse arquivo referente ao usuário precisa ser referenciado no arquivo principal.