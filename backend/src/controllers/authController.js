const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const User = require('../models/user');

const router = express.Router();

function tokenGenerator(params){
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
};

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({email})){
      return res.status(400).send({ error: 'User already registered.' })
    }

    const user = await User.create(req.body);

    user.password = undefined;  //removing the user's password so it wont show on success message
    const token = tokenGenerator({ id: user.id });

    return res.status(200).send({message: 'User successfully created: ', token});
  } catch(error) {

    return res.status(500).send({message: `Could not registrate: ${error}`});
  }
}); 

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  //buscando usuário por email, sem exibir a senha e verificando se há senha para este usuário
  const user = await User.findOne({ email }).select('+password'); 

  if (!user){ //verificando se existe usuário fornecido
    res.status(400).send({ error: 'User not found' });
  }

  if(!await bcrypt.compare(password, user.password)) {//comparando a senha fornecida com a senha encontrada no BD.
    res.status(400).send({error: "Password doesn't match. "})
  }

  user.password = undefined;
  const token = tokenGenerator({ id: user.id })
  console.log(token)
  res.status(200).send({message: 'Authentication complete! ', token});
});

module.exports = app =>  app.use('/auth', router) //passando o prefixo 'auth' pra esse router

//Esse arquivo de autenticação precisa ser referenciado no arquivo principal.