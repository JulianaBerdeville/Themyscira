const mongoose = require('mongoose');
const connectionString = process.env.URI;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on('error',  (error) => {
  console.log("If you're reading this, I couldn't connect to MongoDB Atlas. :-( ");
  console.log("Here's why: ", error)
});

mongoose.Promise = global.Promise;


module.exports = mongoose;