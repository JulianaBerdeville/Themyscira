const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const mailer = require('../modules/mailer');  


router.use(authMiddleware);

//POST - User send message to Themyscira devs
router.post('/', async (req, res) => {
  try {

    const { name, email, content } = req.body;


    const mailOptions = {
      from: email,
      to: 'no-reply@themyscirra.com',
      template: 'contact_us', //template HTML que aparece no email
      context: { content, name } //variáveis que vou exportar pro HTML
    };
    
    mailer.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(400).send({error: 'Could not send message.'})
      } else {
        res.status(200).send({message: 'Message sent successfully! Amen'})
        console.log('Email enviado: ' + info.response);
      }
    });

    return res.status(200).send({ message: 'Message sent successfully: ', });

  } catch (error) {
    console.log('why did it went wrong --> ', error);
    res.status(400).send({ error: 'Could not send message.' });
  }
});


module.exports = app => app.use('/contact-us', router);