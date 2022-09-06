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

const readCreatureFile = () => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    return creatureData
}

// express app config
const app = express()
const PORT = 3002
app.set('view engine', 'ejs')
app.use(layout)
// tell express to listen for request bodies sent from HTML forms
app.use(express.urlencoded({ extended: false }))

// route definitions
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// GET /dinosaurs -- show all dinos
app.get('/dinosaurs', (req, res) => {
    const dinoData = readDinoFile()
    // console.log(dinosaurs)
    // console.log(dinoData)
    // send the dino info to the client
    // TODO: add ejs view
    res.render('dinos/index.ejs', {
        dinos: dinoData
    })
})

// GET /dinosaurs/new -- display a form to create a new dino
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinos/new.ejs')
})

// POST /dinosaurs -- create a new dino in the DB
app.post('/dinosaurs', (req, res) => {
    // read the dino file
    const dinoData = readDinoFile()
    // payload of data from the request body (req.body)
    // push the data payload into the array of dinos
    console.log(req.body)
    dinoData.push(req.body)
    // save the dino file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // on POST routes -- DO NOT RENDER A TEMPLATE (this rule can be broken)
    // redirect to where you can find a template
    // redirects tell browsers to make a GET request on a url
    res.redirect('/dinosaurs')
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


// -------------------------------------------------------
// GET /prehistoric_creatures -- show all prehistoric creatures
app.get('/prehistoric_creatures', (req, res) => {
    const creatureData = readCreatureFile()
    res.render(`prehistoric-creatures/index.ejs`, {
        creatures: creatureData
    })
})

// GET /prehistoric_creatures/new -- display a form to create a new prehistoric creature
app.get('/prehistoric_creatures/new', (req, res) => {
    res.render(`prehistoric-creatures/new.ejs`)
})

// POST /prehistoric_creatures -- create a new dino in the DB
app.post('/prehistoric_creatures', (req, res) => {
    res.send(`Creates a prehistoric creature with the POST payload data`)
})

// GET /prehistoric_creatures/:id -- display the detail of one specific prehistoric creature
app.get('/prehistoric_creatures/:id', (req, res) => {
    res.send(`Displays the type and photo of a particular prehistoric creature (id = )`)
})





// listen on a port
app.listen(PORT, () => console.log(`is that dinos I hear on port ${PORT} 🦕`))