// required packages
const express = require('express')
const layout = require('express-ejs-layouts')


// express app config
const app = express()
const PORT = 3002
app.set('view engine', 'ejs')
app.use(layout)

// route definitions
app.get('/', (req, res) => {
    res.send(`Welcome to the dino CRUD app 🦖`)
})

// GET /dinosaurs -- show all dinos
app.get('/dinsaurs', (req, res) => {
    res.send('Show all dinos')
})

// GET /dinosaurs/new -- display a form to create a new dino
app.get('/dinosaurs/new', (req, res) => {
    res.send('Show a form to create a new dino')
})

// POST /dinosaurs -- create a new dino in the DB
app.post('/dinosaurs', (req, res) => {
    res.send('Create a new dino in the DB')
})

// GET /dinosaurs/:id -- display the details of one specific dino
app.get('/dinosaurs/:id', (req, res) => {
    res.send(`Show details for dino with id of ${req.params.id}`)
})

// listen on a port
app.listen(PORT, () => console.log(`is that dinos I hear on port ${PORT} 🦕`))