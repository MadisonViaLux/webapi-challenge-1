const express = require('express')
const router = express.Router()
const pj = require('../data/helpers/projectModel')

// console.log(router)

router.get('/', (req, res) => {
    pj.get()
        .then(pro => {
            res.status(200).json(pro)
        })
        .catch( err => res.status(500).json({ message: "Could not find project info" }))
})



router.post('/', (req, res) => {
    const newPro = req.body
    
    if(!newPro.name && !newPro.description){
        return res.status(400).json({ errorMessage: "Name feild and Description feild required" })
    } else{
        pj.insert(newPro)
            .then(pro => res.status(201).json(console.log(pro)))
            .catch(err => res.status(500).json({ error: "problem creating project" }))
    }
})



module.exports = router