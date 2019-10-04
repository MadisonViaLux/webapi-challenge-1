const express = require('express')

const action = require('../data/helpers/actionModel')

const router = express.Router()



router.get('/', (req, res) => {
    action.get()
        .then(act => res.status(200).json(act))
        .catch(err => res.send(err))
});


router.get('/:id', (req, res) => {
    const { id } = req.params

    action.get(id)
        .then(act => {
            if(!id){
                res.status(404).json({ error: "cannot find action" })
            } else {
                res.status(200).json(act)
            }
        })
        .catch(err => res.send(err))
})



router.post('/', (req, res) => {
    const newAct = req.body

     if(!newAct.project_id){
            return res.status(400).json({ errorMessage: "Please provide project_id for the action." })
        } else {
            action.insert(newAct)
                .then(addAct => res.status(200).json(addAct))
                .catch(error => res.status(500).json({ error: "error while saving the action to the project" }))
        }
})



router.delete('/:id', (req, res) => {
    const { id } = req.params
    action.remove(id)
        .then(act => {
            if(!id){
                return console.log(res.status(404).json({ message: "The action with the specified ID does not exist." }))
            } else {
                return console.log(res.status(200).json(act))
            }
        })
        .catch(err => res.status(500).json({ error: "The action could not be removed" }))
})



router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    if(!id){
        return console.log(res.status(404).json({ message: "The action with the specified ID does not exist." }))
    } else if(!changes.project_id){
        return console.log(res.status(400).json({ errorMessage: "Please provide project_id for the action." }))
    } else {
        action.update(id, changes)
            .then(update => res.status(200).json(update))
            .catch( err => res.status(500).json({ error: "The action information could not be modified." }))
    }
}) 






module.exports = router