const express = require('express')
const app = express()
const multer  = require('multer')
require('dotenv').config()

const indexRoute = require('./routers/indexRoute')
const laporRoute = require('./routers/laporRoute')

app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'))


app.use('/',indexRoute)
app.use('/lapor',laporRoute)
app.use('*', (req, res) => {
    res.send('404')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server ok')
})