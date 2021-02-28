//requiring in the variable exported in database/connection.js
const db = require('./connection')
//requiring the Joi library for validations
const Joi = require('joi')


//validanting posts values
 const schema = Joi.object().keys({
     username: Joi.string().min(3),
     title: Joi.string().required(),
     content: Joi.string().max(500).required(),
     imageUrl: Joi.string().uri({
         scheme: [
             /https?/
         ]
     })
 })

const posts = db.get('posts')

//function that returns all posts that exists in the database
function getAllPosts() {
    return posts.find()
}


//insert a post in the database
function createPost(post) {
    console.log('console do model', post)
    if (!post.username)
        {
            post.username = 'Anônima(o)'
        }
     const result = schema.validate(post)
     if (result.error == null){
        let day = new Date().getDate()
        let month = new Date().getMonth() +1
        let year = new Date().getFullYear()
        post.created = `${day} - ${month} - ${year}`
        return posts.insert(post)
    } else {
        return Promise.reject(result.error)
    }
}

//making functions available to other files
module.exports = {
    getAllPosts,
    createPost
}