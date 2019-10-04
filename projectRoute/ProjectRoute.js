const express = require('express')

const pj = require('../data/helpers/projectModel')

const router = express.Router()

// console.log(router)

router.get('/', (req, res) => {
    pj.find()
        .then(pro => {
            res.status(200).json(pro)
        })
        .catch( err => res.status(500).json({ message: "Could not find project info" }))
})


router.get('/:id', (req, res) => {
    const { id } = req.params

    pj.find(id)
        .then(pro => {
            if(!id){
                res.status(404).json({ error: "cannot find project" })
            } else {
                res.status(200).json(pro)
            }
        })
        .catch(err => res.send(err))
})


router.post('/', (req, res) => {
    const newPro = req.body
    // console.log(newPro)
    if(!newPro.name && !newPro.description){
        return res.status(400).json({ errorMessage: "Name feild and Description feild required" })
    } else{
        pj.insert(newPro)
            .then(pro => res.status(201).json(pro))
            .catch(err => res.status(500).json({ error: "problem creating project" }))
    }
})


router.delete('/:id', (req, res) => {
    const { id } = req.params

    pj.remove(id)
        .then(pro => {
            if(!id){
                return console.log(res.status(404).json({ message: "The project with the specified ID does not exist." }))
            } else {
                return console.log(res.status(200).json(pro))
            }
        })
        .catch(err => res.status(500).json({ error: "The project could not be removed" }))
})


router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    if(!id){
        return console.log(res.status(404).json({ message: "The project with the specified ID does not exist." }))
    } else if(!changes.name && !changes.description){
        return console.log(res.status(400).json({ errorMessage: "Please provide name and description for the project." }))
    } else {
        pj.update(id, changes)
            .then(update => res.status(200).json(update))
            .catch( error => {
                res.status(500).json({ error: "The project information could not be modified." })
            })
    }
}) 





module.exports = router