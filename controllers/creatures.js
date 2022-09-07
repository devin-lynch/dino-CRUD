const express = require('express')
const router = express.Router()

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
    const creatureData = readCreatureFile()
    console.log(req.body)
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect(`/prehistoric_creatures`)
})

// GET /prehistoric_creatures/:id -- display the detail of one specific prehistoric creature
app.get('/prehistoric_creatures/:id', (req, res) => {
    const creatureData = readCreatureFile()
    const creature = creatureData[req.params.id]
    res.json(creature)
})

module.exports = router