const express = require('express')
const router = express.Router()

router.route('/')
    .get((req,res) => {
        res.render('index')
    })

router.route('/contact')
    .get((req,res) => {
        res.render('contact')
    })

module.exports = router