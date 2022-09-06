// required packages
const express = require('express')
const layout = require('express-ejs-layouts')
const fs = require('fs')

// get the dinos from the db
const readDinoFile = () => {
        // use the filesystem to read the dino json
        const dinosaurs = fs.readFileSync('./dinosaurs.json')
        // parse the file into json data
        const dinoData = JSON.parse(dinosaurs)
        return dinoData
}

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
app.get('/dinosaurs', (req, res) => {
    const dinoData = readDinoFile()
    // console.log(dinosaurs)
    // console.log(dinoData)
    // send the dino info to the client
    // TODO: add ejs view
    res.json(dinoData)
})

// GET /dinosaurs/new -- display a form to create a new dino
app.get('/dinosaurs/new', (req, res) => {
    res.send('Show a form to create a new dino')
})

// POST /dinosaurs -- create a new dino in the DB
app.post('/dinosaurs', (req, res) => {
    // read the dino file
    const dinoData = readDinoFile()
    // payload of data from the request body (req.body)
    // push the data payload into the array of dinos
    console.log(req.body)
    // save the dino file
    // on POST routes -- DO NOT RENDER A TEMPLATE (this rule can be broken)
    // redirect to where you can find a template
})

// GET /dinosaurs/:id -- display the details of one specific dino
app.get('/dinosaurs/:id', (req, res) => {
    // get the dinos from the file
    const dinoData = readDinoFile()
    // look up array index from the url route params
    const dino = dinoData[req.params.id]
    // send back a single dino
    res.json(dino)
})

// listen on a port
app.listen(PORT, () => console.log(`is that dinos I hear on port ${PORT} 🦕`))