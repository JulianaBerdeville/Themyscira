const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  // as verificações feitas aqui, por meio de condicionais, são menos custosas em termos de processamento de máquina
  // e são alternativas às verificações feitas pelo JWT. Quanto menos verificações feitas pelo JWT melhor para 
  // escalabilidade da aplicação.

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided in Authorization header.' });
  }
  //formato que espero nesse campo: Bearer bahefllsmnnvcbbbvwj (Bearer(hash))

  const parts = authHeader.split(' ');

  if(!parts.length ===  2) { //validação pra caso não haja essas duas partes
    return res.status(401).send({ error: 'Token error' });
  }

  //caso haja, deve vir em um array, vamos desestruturá-lo:
  const [ scheme, token ] = parts; //formato: [Bearer, dhesjkdjansvnkanskjn ]

  //Sobre a regex abaixo: a / sinaliza início da regex, ^ sinaliza o início da verificação, Bearer é o que quero
  // $ indica o final da verificação, / de novo pra sinalizar final da regex.


  if (!/^Bearer$/i.test(scheme)) {
    return res.status(400).send({ error: 'Token malformatted.' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'The token provided is invalid.' });
    }

    req.userId = decoded.id;

    return next();
  })
};