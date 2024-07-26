const express = require('express')
const cors = require('cors')
const app = express()
const { db } = require('./db/db') 
const {readdirSync} = require('fs')
require('dotenv').config()



const PORT = process.env.PORT

// Middlewares
app.use(express.json())
app.use(cors())

// routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))
app.get('/', (req, res) => {
    res.send("Hello World")
})
const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Listening to port: ', PORT); 
    })
}

server()