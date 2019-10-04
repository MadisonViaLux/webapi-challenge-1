const express = require('express')
const projectRoutes = require('./projectRoute/ProjectRoute')
const server = express()

server.use(express.json)
server.use('/projects', projectRoutes)


server.get('/', (req, res) => {
    res.send(`<h2>It's working!</h2>`)
});


module.exports = server




// http://localhost:7777/projects