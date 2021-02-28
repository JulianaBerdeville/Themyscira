const monk = require('monk')
const connectionString = 'localhost/forumDatabase'
const database = monk(connectionString)

module.exports = database

