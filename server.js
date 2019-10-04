const express = require('express')
const projectRoutes = require('./projectRoute/ProjectRoute')
const actionRoutes = require('./actionRoute/ActionRoute')
const server = express()

server.use(express.json())
server.use('/projects', projectRoutes)
server.use('/projects/:id/actions', actionRoutes)

server.get('/', (req, res) => {
    res.send(`<h2>It's working!</h2>`)
});


module.exports = server




// http://localhost:7777/projects

// http://localhost:7777/projects/:id/actions