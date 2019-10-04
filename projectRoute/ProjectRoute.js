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
    const { id } =req.params

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



module.exports = router