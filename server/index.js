//bringing express dependency in. Same as import in Typescript
const express = require('express')  
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const posts = require('./database/postsModel')

//creating express application
const app = express()

//adding dependencies to the app
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())


//creating GET request (API endpoint) to test if server is working
app.get('/', (req, res) => {
    res.json({
        message: 'Testing the server... It is working! 🧞‍♀️🎉'
    })
})

//creating GET request (API endpoint) to fetch all posts in the database
app.get('/getAllPosts', (req, res) => {
    posts.getAllPosts()
        .then((posts) => {
            res.json(posts)
        })  
})

//creating a POST request (API endpoint) to insert a new post in the database
app.post('/createPost', (req, res) => {
    let post = req.body
    console.log('console do index', post)
    posts.createPost(post)
        .then((post) => {
            res.status(200).send({message:`Neat! you've just posted '${post.title}'`})
        })
        .catch((error) => {
            res.status(400).send({message: `Oops! something went wrong!  |  ${error}`})
        })
})
 
//Defining that server is going to run on port defined at .env file or at port 3456 
const port = process.env.PORT || 3456
app.listen(port, () => {
    console.log(`Yas! server is running on port ${port}`)
})
