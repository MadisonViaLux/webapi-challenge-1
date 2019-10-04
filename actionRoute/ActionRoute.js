const express = require('express')

const action = require('../data/helpers/actionModel')

const router = express.Router()



router.get('/', (req, res) => {
    action.get()
        .then(act => res.status(200).json(act))
        .catch(err => res.send(err))
});



module.exports = router