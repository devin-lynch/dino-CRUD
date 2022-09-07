const express = require('express')
const router = express.Router()

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

module.exports = router