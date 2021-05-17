/** ESTRUTUTRA INICIAL DO PROJETO -- REESCREVER USANDO MONGOOSE **/
// require('dotenv').config();
// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
// const app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// const serverPort = process.env.PORT;


// //Mongodb connection to cluster0 string. It goes inside mongoClient connect method
// const connectionString = process.env.URI;

// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log("[!!!!] HOORRAY! We're connected to the database [!!!!]");
    
//     const db = client.db('ThemysciraBD');
//     const users = db.collection('users');
//     const posts = db.collection('posts');
//     const comments = db.collection('comments');


//     /** USER RELATED ENDPOINTS **/
//     /*Read endpoint - get all users*/
//     app.get('/users', (req, res) => {
//       db.collection('users').find().toArray()
//         .then(response => {
//           res.status(200).send({ message: "Nice! Request complete: ", response });
//         })
//         .catch(error => {
//           res.status(500).send({ message: `There was an error: ${error}`});
//         })
//     })
   
//     /*Create endopoint - create new user*/
//     app.post('/users/createUser', (req, res) => {
//       users.insertOne(req.body)
//         .then(response => {
//           res.status(200).send({ message: "Nice! Request complete: ", response });
//         })
//         .catch(error => {
//           res.status(500).send({ message: `There was an error: ${error}`});
//         })
//     })
   
//     /*Update endopoint - change username*/
//     app.put('/users/changeUsername', (req, res) => {
//       users.findOneAndUpdate( 
//         {username: req.body.username}, 
//         {
//           $set: { username: req.body.new_username }
//         }
//       )
//       .then(response => {
//         const data = Object.entries(response);
//         const usernameExists = data[0][1].updatedExisting
//         if (usernameExists === false){
//           res.status(409).send({message: `Username ${req.body.username} does not exists.`})
//         } else {
//           res.status(200).send({ message: `Username updated from ${req.body.username} to ${req.body.new_username}`});
//         }
//       })
//       .catch(error => {
//         res.status(500).send({ message: 'There was an error: ', error});
//       })
//     })
   
//     /*Update endopoint - change name*/
//     app.put('/users/changeName', (req, res) => {
//       users.findOneAndUpdate( 
//         {name: req.body.name}, 
//         {
//           $set: { name: req.body.new_name }
//         }
//       )
//       .then(response => {
//         var count = 0;
//         count++;
//         if (count = 5) {
//           res.status(409).send({message: `You've reached the maximum number of name changes.`})
//         }
//         const data = Object.entries(response);
//         const nameExists = data[0][1].updatedExisting
//         if (nameExists === false){
//           res.status(409).send({message: `Name ${req.body.name} does not exists.`})
//         } else {
//           res.status(200).send({ message: `Name updated from ${req.body.name} to ${req.body.new_name}`});
//         }
//       })
//       .catch(error => {
//         res.status(500).send({ message: 'There was an error: ', error});
//       })
//     })
   

//     /** POST RELATED ENDPOINTS**/
//     /*Read endpoint - get all posts*/
//     app.get('/posts', (req, res) => {
//       db.collection('posts').find().toArray()
//         .then(response => {
//           res.status(200).send({ message: "Nice! Request complete."});
//         })
//         .catch(error => {
//           res.status(500).send({ message: `There was an error: ${error}`});
//         })
//     })

//     /*Create endopoint - create new user*/
//     app.post('/posts/createPost', (req, res) => {
//       posts.insertOne(req.body)
//         .then(response => {
//           res.status(200).send({ message: "Nice! Request complete: ", response });
//         })
//         .catch(error => {
//           res.status(500).send({ message: `There was an error: ${error}`});
//         })
//     })

//     /*Delete endpoint*/
//     app.delete('/posts/deletePost:id', (req, res) => {
//       posts.deleteOne(
//         { title: req.body.title }
//       )
//         .then(result => {
//           res.json(`Deleted post which title was: ${req.body.title}`)
//         })
//         .catch(error => console.error(error))
//     })


//     /** COMMENT RELATED ENDPOINTS**/
//     /*Read endpoint - get all comments*/
//     app.get('/comments', (req, res) => {
//       db.collection('comments').find().toArray()
//         .then(response => {
//           res.status(200).send({ message: "Nice! Request complete."});
//         })
//         .catch(error => {
//           res.status(500).send({ message: `There was an error: ${error}`});
//         })
//     });
  
//     /*Create endpoint - create new comment*/
//     app.post('/comments/createComment', (req, res) => {
//       comments.insertOne(req.body)
//         .then(response => {
//           res.status(200).send({message: "Nice! Request complete."});
//         })
//         .catch(error => {
//           res.status(500).send({message: `There was an error: `});
//         })
//     });
  
//     /*Delete endpoint - delete comment*/
//     app.delete('/comments/deleteComment:id', (req, res) => {
//       comments.deleteOne(
//         { title: req.body.title }
//       )
//         .then(result => {
//           res.json(`Deleted post which title was: ${req.body.title}`)
//         })
//         .catch(error => console.error(error))
//     })

//   });

//   app.listen(serverPort, () => {
//     console.log(`>>> HOORRAY :-) We're live on http://localhost:${serverPort} <<<`);
//   });

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const serverPort = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(serverPort, () => {
  console.log(`>>> HOORRAY :-) I'm alive on http://localhost:${serverPort} <<<`);
});

require('./controllers/authController')(app) //aqui eu instancio o authController no server.js e repasso o app pra ele
require('./controllers/projectController')(app) 