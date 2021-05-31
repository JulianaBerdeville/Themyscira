require('dotenv').config();
const express = require('express');
const cors = require("cors");
const logger = require("morgan");
const serverPort = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
require('./controllers/authController')(app);
require('./controllers/postController')(app); 
require('./controllers/commentController')(app); 
require('./controllers/userController')(app); 
require('./controllers/contactController')(app); 
app.use(logger('dev'));

app.listen(serverPort, () => {
  console.log(`>>> HOORRAY :-) I'm alive on http://localhost:${serverPort} <<<`);
});

module.exports = app;