const express = require('express')

const action = require('../data/helpers/actionModel')

const router = express.Router()



router.get('/', (req, res) => {
    action.get()
        .then(act => res.status(200).json(act))
        .catch(err => res.send(err))
});


// router.get('/:id', (req, res) => {
//     const { id } = req.params

//     action.get(id)
//         .then(act => {
//             if(!id){
//                 res.status(404).json({ error: "cannot find action" })
//             } else {
//                 res.status(200).json(action)
//             }
//         })
//         .catch(err => res.send(err))
// })






module.exports = router