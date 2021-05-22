const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const crypto = require('crypto'); 
const mailer = require('../modules/mailer');  

const User = require('../models/user');
const { use } = require('../modules/mailer');
const { inflate } = require('zlib');

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

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({error: 'User not found.'});
    }

    const token = crypto.randomBytes(20).toString('hex'); //criando token de 20 char em uma string em hexadecimal

    const now = new Date();
    now.setHours(now.getHours() +1);

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });

    const mailOptions = {
      from: 'no-reply@themyscirra.com',
      to: 'themyscirauser@gmail.com',
      template: 'forgot_password',
      context: { token }
    };
    
    mailer.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(400).send({error: 'Could not send email.'})
      } else {
        res.status(200).send({message: 'Email sent successfully! Amen'})
        console.log('Email enviado: ' + info.response);
      }
    });

    console.log(token, now);

  } catch(error) {
    res.status(400).send({error: 'Error on forgot password. Try again.'});
  }
});

router.post('/reset_password', async(req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

    if (!user) {
      res.status(400).send({error: 'User not found.'})
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).send({error: 'Token invalid.'});
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      return res.status(400).send({error: 'Token expired.'});
    }

    user.password =  password;

    await user.save();

    res.status(200).send({message: 'Password reset successfully.'});

  } catch (error) {
    res.status(400).send({error: 'Could not reset password.'});
  }
});
module.exports = app =>  app.use('/auth', router) //passando o prefixo 'auth' pra esse router

//Esse arquivo de autenticação precisa ser referenciado no arquivo principal.