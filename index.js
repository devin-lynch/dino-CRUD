// required packages
const express = require('express')
const layout = require('express-ejs-layouts')


// express app config
const app = express()
const PORT = 3001
app.set('view engine', 'ejs')
app.use(layout)

// route definitions
app.get('/', (req, res) => {
    res.send(`Welcome to the dino CRUD app 🦖`)
})

// listen on a port
app.listen(PORT, () => {
    console.log(`is that dinos I hear on port ${PORT} 🦕`)
})